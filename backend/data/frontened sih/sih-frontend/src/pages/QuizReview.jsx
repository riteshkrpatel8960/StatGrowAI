import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizReview() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending Review");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "Which SQL command is used to retrieve data?",
      answer: "SELECT",
    },
    {
      id: 2,
      question:
        "Which clause is used to filter records?",
      answer: "WHERE",
    },
    {
      id: 3,
      question:
        "Which keyword sorts query results?",
      answer: "ORDER BY",
    },
  ]);

  const updateQuestion = (id, value) => {
    setQuestions(
      questions.map((item) =>
        item.id === id
          ? {
              ...item,
              question: value,
            }
          : item
      )
    );
  };

  const approveQuiz = () => {
    setStatus("Approved");
  };

  const rejectQuiz = () => {
    setStatus("Rejected");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-purple-400">
              Admin
            </p>

            <h1 className="text-2xl font-bold">
              Quiz Review
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-slate-800 rounded-lg"
          >
            ← Admin
          </button>

        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-bold">
              SQL Fundamentals Quiz
            </h2>

            <p className="text-slate-400">
              AI Generated Assessment
            </p>
          </div>

          <span className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg">
            {status}
          </span>

        </div>

        <div className="space-y-5">

          {questions.map((item, index) => (

            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >

              <p className="text-blue-400 text-sm">
                QUESTION {index + 1}
              </p>

              <textarea
                value={item.question}
                onChange={(e) =>
                  updateQuestion(
                    item.id,
                    e.target.value
                  )
                }
                className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none resize-none"
                rows="2"
              />

              <p className="text-slate-400 mt-4">
                Correct Answer:
              </p>

              <p className="text-green-400 font-semibold mt-1">
                {item.answer}
              </p>

            </div>

          ))}

        </div>

        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={approveQuiz}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
          >
            ✓ Approve Quiz
          </button>

          <button
            onClick={rejectQuiz}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
          >
            ✕ Reject Quiz
          </button>

        </div>

      </main>

    </div>
  );
}

export default QuizReview;