import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizGenerator() {
  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate("/admin")}
          className="mb-6 px-4 py-2 bg-slate-800 rounded-lg"
        >
          ← Admin Dashboard
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold">
            🤖 AI Quiz Generator
          </h1>

          <p className="text-slate-400 mt-2">
            Generate questions from uploaded learning material.
          </p>

          <select className="mt-8 w-full bg-slate-800 border border-slate-700 rounded-xl p-4">
            <option>SQL Fundamentals</option>
            <option>Python Programming</option>
            <option>Data Structures</option>
          </select>

          <select className="mt-4 w-full bg-slate-800 border border-slate-700 rounded-xl p-4">
            <option>5 Questions</option>
            <option>10 Questions</option>
            <option>20 Questions</option>
          </select>

          <button
            onClick={() => setGenerated(true)}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
          >
            Generate Quiz
          </button>

          {generated && (
            <div className="mt-6 bg-slate-800 rounded-xl p-5">

              <p className="text-green-400 font-semibold">
                ✓ Quiz Generated Successfully
              </p>

              <p className="text-slate-400 mt-2">
                Generated questions are ready for admin review.
              </p>

              <button
                onClick={() => navigate("/admin/review")}
                className="mt-5 px-5 py-3 bg-blue-600 rounded-xl font-semibold"
              >
                Review Quiz →
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default QuizGenerator;