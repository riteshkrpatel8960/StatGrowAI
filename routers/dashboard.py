from fastapi import APIRouter, Depends

from database import get_db_connection
from routers.auth import get_current_user


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_table_columns(connection, table_name):
    cursor = connection.cursor()

    cursor.execute(
        f"SHOW COLUMNS FROM {table_name}"
    )

    columns = [
        row[0]
        for row in cursor.fetchall()
    ]

    cursor.close()

    return columns


@router.get("/")
def get_dashboard(
    user: dict = Depends(get_current_user)
):

    connection = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # -------------------------------------------------
        # USER
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT id, name, email, role
            FROM users
            WHERE email = %s
            LIMIT 1
            """,
            (user["email"],)
        )

        db_user = cursor.fetchone()


        if db_user:

            user_data = {
                "id": db_user["id"],
                "name": db_user["name"],
                "email": db_user["email"],
                "role": db_user["role"]
            }

        else:

            user_data = {
                "email": user["email"],
                "role": user["role"]
            }


        # -------------------------------------------------
        # COMPETENCIES
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                c.id,
                c.name,
                uc.score
            FROM user_competencies uc
            JOIN competencies c
                ON uc.competency_id = c.id
            WHERE uc.user_id = %s
            """,
            (user_data.get("id"),)
        )

        competencies = cursor.fetchall()


        # -------------------------------------------------
        # ASSESSMENTS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                id,
                quiz_id,
                score,
                total,
                percentage
            FROM assessments
            WHERE user_id = %s
            """,
            (user_data.get("id"),)
        )

        assessments = cursor.fetchall()


        # -------------------------------------------------
        # RECOMMENDATIONS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                id,
                competency,
                resource_title,
                resource_type,
                reason
            FROM recommendations
            WHERE user_id = %s
            """,
            (user_data.get("id"),)
        )

        recommendations = cursor.fetchall()


        # -------------------------------------------------
        # LEARNING PROGRESS
        # -------------------------------------------------

        learning_progress = {

            "percentage": 0,

            "completed": 0,

            "in_progress": 0,

            "remaining": 0

        }


        progress_columns = get_table_columns(
                connection,
                "learning_progress"
            )


        # Find user column

        user_column = None

        possible_user_columns = [

            "user_id",
            "employee_id"

        ]


        for column in possible_user_columns:

            if column in progress_columns:

                user_column = column

                break


        # Find progress column

        progress_column = None

        possible_progress_columns = [

            "progress_percentage",
            "percentage",
            "progress",
            "completion_percentage"

        ]


        for column in possible_progress_columns:

            if column in progress_columns:

                progress_column = column

                break


        # Find status column

        status_column = None

        possible_status_columns = [

            "status",
            "progress_status"

        ]


        for column in possible_status_columns:

            if column in progress_columns:

                status_column = column

                break


        # Query learning progress

        if user_column:

            cursor.execute(
                f"""
                SELECT *
                FROM learning_progress
                WHERE {user_column} = %s
                """,
                (user_data.get("id"),)
            )

        else:

            cursor.execute(
                """
                SELECT *
                FROM learning_progress
                """
            )


        progress_rows = cursor.fetchall()


        # Calculate progress

        if progress_rows:

            progress_values = []


            for row in progress_rows:

                # Percentage

                if progress_column:

                    value = row.get(
                        progress_column
                    )

                    if value is not None:

                        try:

                            progress_values.append(
                                float(value)
                            )

                        except (ValueError, TypeError):

                            pass


                # Status

                if status_column:

                    status = str(
                        row.get(
                            status_column
                        ) or ""
                    ).lower().strip()


                    if status in [
                        "completed",
                        "complete",
                        "finished",
                        "done"
                    ]:

                        learning_progress[
                            "completed"
                        ] += 1


                    elif status in [
                        "in_progress",
                        "in progress",
                        "started",
                        "ongoing"
                    ]:

                        learning_progress[
                            "in_progress"
                        ] += 1


            # Average percentage

            if progress_values:

                average_progress = (
                    sum(progress_values)
                    / len(progress_values)
                )

                learning_progress[
                    "percentage"
                ] = round(
                    average_progress
                )


            # Remaining

            learning_progress[
                "remaining"
            ] = max(
                len(progress_rows)
                - learning_progress["completed"]
                - learning_progress["in_progress"],
                0
            )


        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

        return {

            "message":
                "Dashboard data retrieved successfully",

            "user":
                user_data,

            "competencies":
                competencies,

            "assessments":
                assessments,

            "recommendations":
                recommendations,

            "learning_progress":
                learning_progress

        }


    except Exception as e:

        print(
            "Dashboard error:",
            str(e)
        )

        return {
            "message":
                "Dashboard data retrieval failed",

            "error":
                str(e)
        }


    finally:

        if connection:

            connection.close()