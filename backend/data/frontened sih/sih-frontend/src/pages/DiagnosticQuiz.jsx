import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "Which data structure follows FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
  },
  {
    question: "Which language is mainly used for web page structure?",
    options: ["Python", "HTML", "C++", "Java"],
    answer: 1,
  },
  {
    question: "Which data structure follows LIFO?",
    options: ["Queue", "Array", "Stack", "Tree"],
    answer: 2,
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "define", "int", "string"],
    answer: 0,
  },
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Control Processing User",
    ],
    answer: 0,
  },
  {
    question: "Which one is an operating system?",
    options: ["Python", "Windows", "HTML", "MySQL"],
    answer: 1,
  },
  {
    question: "Which data structure stores elements in sequential order?",
    options: ["Array", "Graph", "Tree", "Queue"],
    answer: 0,
  },
  {
    question: "Which protocol is commonly used for secure web browsing?",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    answer: 1,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "##", "<!--", "**"],
    answer: 0,
  },
  {
    question: "Which database language is used to query relational databases?",
    options: ["HTML", "CSS", "SQL", "Python"],
    answer: 2,
  },
];

function DiagnosticQuiz() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer first.");
      return;
    }

    let newScore = score;

    if (selectedAnswer === question.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestion === questions.length - 1) {
      // Save result temporarily
      localStorage.setItem("diagnosticScore", newScore);

      // Go to dashboard
      navigate("/dashboard");
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8">

        {/* Header */}
        <p className="text-blue-400 font-semibold">
          Diagnostic Assessment
        </p>

        <h1 className="text-3xl font-bold text-white mt-2">
          Let's understand your skills
        </h1>

        <p className="text-slate-400 mt-2">
          Answer the questions to create your competency profile.
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
              )}
              %
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-white mt-8">
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
          className="mt-8 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          {currentQuestion === questions.length - 1
            ? "Submit Assessment"
            : "Next Question"}
        </button>

      </div>
    </div>
  );
}

export default DiagnosticQuiz;