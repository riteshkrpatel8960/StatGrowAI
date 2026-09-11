from backend.data.competency_history import get_previous_score


COURSES = {

    "Statistics": [
        "Basic Statistics",
        "Advanced Statistical Methods"
    ],

    "Probability": [
        "Probability Fundamentals",
        "Applied Probability"
    ],

    "Data Analysis": [
        "Data Analysis Fundamentals",
        "Advanced Data Analysis"
    ],

    "Sampling": [
        "Sampling Techniques",
        "Advanced Sampling Methods"
    ],

    "Mean": [
        "Understanding Mean",
        "Advanced Mean Analysis"
    ],

    "Median": [
        "Understanding Median",
        "Advanced Median Analysis"
    ],

    "Mode": [
        "Understanding Mode",
        "Advanced Mode Analysis"
    ]
}


def get_recommendations(competency_result):

    recommendations = []

    for skill, data in competency_result.items():

        score = data["score"]

        if score < 40:

            if skill in COURSES:

                recommendations.append({
                    "skill": skill,
                    "score": score,
                    "status": "Competency Gap",
                    "priority": "High",
                    "course": COURSES[skill][0],
                    "reason": f"Your score in {skill} is {score}%. Immediate learning is recommended."
                })

        elif score < 50:

            if skill in COURSES:

                recommendations.append({
                    "skill": skill,
                    "score": score,
                    "status": "Competency Gap",
                    "priority": "Medium",
                    "course": COURSES[skill][0],
                    "reason": f"Your score in {skill} is {score}%. Improvement is required."
                })

        elif score < 75:

            if skill in COURSES:

                recommendations.append({
                    "skill": skill,
                    "score": score,
                    "status": "Needs Improvement",
                    "priority": "Low",
                    "course": COURSES[skill][1],
                    "reason": f"Your score in {skill} is {score}%. Additional practice is recommended."
                })

    priority_order = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    }

    recommendations.sort(
        key=lambda x: priority_order[x["priority"]]
    )

    return recommendations


def analyze_progress(employee_name, skill, current_score):

    previous_score = get_previous_score(
        employee_name,
        skill
    )

    if previous_score is None:

        return {
            "message": "No previous score available."
        }

    difference = current_score - previous_score

    if difference > 0:
        progress = "Improving"

    elif difference < 0:
        progress = "Declining"

    else:
        progress = "No Change"

    return {
        "skill": skill,
        "previous_score": previous_score,
        "current_score": current_score,
        "difference": difference,
        "progress": progress
    }