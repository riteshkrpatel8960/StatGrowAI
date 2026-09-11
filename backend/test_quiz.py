from services.quiz import calculate_quiz_score
from ai.competency import calculate_status, analyze_competencies
from ai.recommendation import get_recommendations, analyze_progress
from data.competency_history import add_score


EMPLOYEE_NAME = "Rahul"
SKILL = "Probability"


correct_answers = ["B", "C", "C", "A", "B"]

user_answers = ["A", "A", "A", "B", "A"]


# ==============================
# QUIZ SCORE
# ==============================

result = calculate_quiz_score(
    correct_answers,
    user_answers
)


print("\n==============================")
print("        QUIZ RESULT")
print("==============================")

print("Total Questions :", result["total_questions"])
print("Correct Answers :", result["correct_answers"])
print("Wrong Answers   :", result["wrong_answers"])
print("Score           :", result["score"], "%")


# ==============================
# COMPETENCY ANALYSIS
# ==============================

status = calculate_status(
    result["score"]
)

print("Competency Status:", status)


employee_competencies = {
    SKILL: result["score"]
}


updated_result = analyze_competencies(
    employee_competencies
)


print("\n==============================")
print("     UPDATED COMPETENCY")
print("==============================")


for skill, data in updated_result.items():

    print(
        skill,
        ":",
        data["score"],
        "%",
        "->",
        data["status"]
    )


# ==============================
# RECOMMENDATION
# ==============================

recommendations = get_recommendations(
    updated_result
)


print("\n==============================")
print(" PERSONALIZED RECOMMENDATIONS")
print("==============================")


if recommendations:

    for recommendation in recommendations:

        print("\nSkill Gap       :", recommendation["skill"])
        print("Score           :", recommendation["score"], "%")
        print("Status          :", recommendation["status"])
        print("Priority        :", recommendation["priority"])
        print("Recommended     :", recommendation["course"])
        print("Reason          :", recommendation["reason"])

else:

    print("No recommendation needed. Competency is strong.")


# ==============================
# PROGRESS
# ==============================

progress = analyze_progress(
    EMPLOYEE_NAME,
    SKILL,
    result["score"]
)


print("\n==============================")
print("       PROGRESS ANALYSIS")
print("==============================")


if "skill" in progress:

    print("Skill          :", progress["skill"])
    print("Previous Score :", progress["previous_score"], "%")
    print("Current Score  :", progress["current_score"], "%")
    print("Difference     :", progress["difference"], "%")
    print("Progress       :", progress["progress"])

else:

    print(progress["message"])


# ==============================
# SAVE CURRENT SCORE
# ==============================

add_score(
    EMPLOYEE_NAME,
    SKILL,
    result["score"]
)

print("\nCurrent score has been saved to competency history.")