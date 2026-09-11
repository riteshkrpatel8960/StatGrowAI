import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "Which SQL command is used to retrieve data from a table?",
    options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
    answer: 1,
  },
  {
    question: "Which SQL clause is used to filter records?",
    options: ["ORDER BY", "GROUP BY", "WHERE", "JOIN"],
    answer: 2,
  },
  {
    question: "Which SQL keyword is used to sort query results?",
    options: ["SORT", "ORDER BY", "ARRANGE", "GROUP"],
    answer: 1,
  },
  {
    question: "Which command is used to add a new record?",
    options: ["INSERT", "CREATE", "ALTER", "SELECT"],
    answer: 0,
  },
  {
    question: "Which SQL command removes a table?",
    options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
    answer: 2,
  },
];

function Assessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer.");
      return;
    }

    let newScore = score;

    if (selectedAnswer === question.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestion === questions.length - 1) {
      const percentage = Math.round(
        (newScore / questions.length) * 100
      );

      localStorage.setItem("assessmentScore", percentage);

      navigate("/result");
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <p className="text-blue-400 font-semibold">
          Course Assessment
        </p>

        <h1 className="text-3xl font-bold mt-2">
          SQL Fundamentals Assessment
        </h1>

        <p className="text-slate-400 mt-2">
          Test your understanding of the course concepts.
        </p>

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full">

            <div
              className="h-2 bg-blue-600 rounded-full transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

        {/* Question */}

        <h2 className="text-xl font-semibold mt-8">
          {question.question}
        </h2>

        {/* Options */}

        <div className="mt-6 space-y-3">

          {question.options.map((option, index) => (

            <button
              key={option}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full text-left p-4 rounded-xl border transition ${
                selectedAnswer === index
                  ? "border-blue-500 bg-blue-600/20 text-white"
                  : "border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-500"
              }`}
            >

              <span className="font-semibold mr-2">
                {String.fromCharCode(65 + index)}.
              </span>

              {option}

            </button>

          ))}

        </div>

        {/* Next / Submit */}

        <button
          onClick={handleNext}
          className="mt-8 px-7 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
        >
          {currentQuestion === questions.length - 1
            ? "Submit Assessment"
            : "Next Question"}
        </button>

      </div>

    </div>
  );
}

export default Assessment;