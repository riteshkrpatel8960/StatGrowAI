import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="100.78.8.44",
        user="ai_user",
        password="Harsha@2007",
        database="ai_learning_platform",
        port=3306
    )

    return connection