import json
import os

HISTORY_FILE = os.path.join(
    os.path.dirname(__file__),
    "competency_history.json"
)


def load_history():
    if not os.path.exists(HISTORY_FILE):
        return {}

    with open(HISTORY_FILE, "r") as file:
        return json.load(file)


def save_history(history):
    with open(HISTORY_FILE, "w") as file:
        json.dump(history, file, indent=4)


def add_score(employee_name, skill, score):

    history = load_history()

    if employee_name not in history:
        history[employee_name] = {}

    if skill not in history[employee_name]:
        history[employee_name][skill] = []

    history[employee_name][skill].append(score)

    save_history(history)


def get_previous_score(employee_name, skill):

    history = load_history()

    if employee_name not in history:
        return None

    if skill not in history[employee_name]:
        return None

    scores = history[employee_name][skill]

    if len(scores) < 2:
        return None

    return scores[-2]