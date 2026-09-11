def calculate_status(score):

    if score >= 75:
        return "Strong"

    elif score >= 50:
        return "Needs Improvement"

    else:
        return "Competency Gap"


def analyze_competencies(scores):

    result = {}

    for skill, score in scores.items():

        result[skill] = {
            "score": score,
            "status": calculate_status(score)
        }

    return result