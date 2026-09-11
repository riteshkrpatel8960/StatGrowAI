def calculate_quiz_score(correct_answers, user_answers):

    total_questions = len(correct_answers)

    correct_count = 0

    for i in range(total_questions):

        if correct_answers[i] == user_answers[i]:
            correct_count += 1

    score = (correct_count / total_questions) * 100

    return {
        "total_questions": total_questions,
        "correct_answers": correct_count,
        "wrong_answers": total_questions - correct_count,
        "score": score
    }