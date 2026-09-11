from services.pdf_reader import extract_pdf_text
from ai.mcq_generator import detect_topics, generate_mcqs


# PDF ka path
pdf_path = "learning_material/statistics.pdf"


# PDF se text extract karo
text = extract_pdf_text(pdf_path)


print("\n==============================")
print("       EXTRACTED PDF TEXT")
print("==============================\n")

print(text)


# Topics detect karo
topics = detect_topics(text)


print("\n==============================")
print("       DETECTED TOPICS")
print("==============================\n")

for topic in topics:
    print("-", topic)


# AI se MCQs generate karo
print("\n==============================")
print("       AI GENERATED MCQs")
print("==============================\n")

mcqs = generate_mcqs(text, 5)

print(mcqs)