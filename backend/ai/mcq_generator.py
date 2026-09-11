import os
from dotenv import load_dotenv
from openai import OpenAI


# .env file se API key load karo
load_dotenv()

# OpenAI client banao
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def detect_topics(text):

    possible_topics = [
        "Mean",
        "Median",
        "Mode",
        "Probability",
        "Sampling",
        "Statistics",
        "Data Analysis"
    ]

    detected_topics = []

    for topic in possible_topics:

        if topic.lower() in text.lower():
            detected_topics.append(topic)

    return detected_topics


def generate_mcqs(text, number_of_questions=5):

    prompt = f"""
You are an AI learning assistant for India's Official Statistical System.

Read the following learning material and generate {number_of_questions}
multiple-choice questions.

Learning Material:
{text}

Rules:
1. Questions must be based only on the provided material.
2. Each question must have 4 options.
3. There must be exactly one correct answer.
4. Include easy, medium and difficult questions.
5. Give a short explanation for the correct answer.
6. Return the questions in a clear format.

For every question provide:
Question
Option A
Option B
Option C
Option D
Correct Answer
Explanation
"""

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )

    return response.output_text