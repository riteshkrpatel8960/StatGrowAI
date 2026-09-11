import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);

  const selectedCourse =
    localStorage.getItem("selectedCourse") || "SQL Fundamentals";

  useEffect(() => {
    const savedScore = localStorage.getItem("assessmentScore");

    if (savedScore) {
     setScore(Number(savedScore));
    }
  }, []);

  const getLevel = () => {
    if (score >= 80) return "Advanced";
    if (score >= 60) return "Intermediate";
    return "Beginner";
  };

  const getGap = () => {
    return Math.max(0, 80 - score);
  };

  const getMessage = () => {
    if (score >= 80) {
      return "Excellent performance! You have a strong understanding of this competency.";
    }

    if (score >= 60) {
      return "Good performance! Continue practicing to reach the target competency.";
    }

    return "You need more practice. Follow the recommended learning path to improve this skill.";
  };

  const handleRecommendations = () => {
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-800 bg-slate-900">

        <div className="max-w-6xl mx-auto px-6 py-5">

          <p className="text-blue-400 font-medium">
            Assessment Complete
          </p>

          <h1 className="text-3xl font-bold mt-1">
            Your Assessment Result
          </h1>

          <p className="text-slate-400 mt-2">
            Here is your competency analysis based on the assessment.
          </p>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto p-6 md:p-8">

        {/* ================= SCORE CARD ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">

          <p className="text-slate-400">
            {selectedCourse}
          </p>

          <div className="mt-6">

            <div className="text-6xl font-bold text-blue-400">
              {score}%
            </div>

            <p className="text-slate-400 mt-3">
              Assessment Score
            </p>

          </div>

          {/* Level */}

          <div className="mt-6 inline-block px-6 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full">

            <span className="text-blue-400 font-semibold">
              {getLevel()} Level
            </span>

          </div>

          <p className="max-w-2xl mx-auto text-slate-400 mt-6 leading-relaxed">
            {getMessage()}
          </p>

        </div>

        {/* ================= COMPETENCY UPDATE ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-xl font-semibold">
                Competency Update
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Your competency has been updated based on your latest assessment.
              </p>

            </div>

            <span className="text-2xl font-bold text-blue-400">
              {score}%
            </span>

          </div>

          {/* Progress */}

          <div className="mt-6">

            <div className="w-full h-3 bg-slate-800 rounded-full">

              <div
                className="h-3 bg-blue-600 rounded-full transition-all"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* ================= SKILL ANALYSIS ================= */}

        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* Current Score */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold">
              Skill Analysis
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Course
                </span>

                <span className="font-semibold">
                  {selectedCourse}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Current Score
                </span>

                <span className="font-semibold">
                  {score}%
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Target Score
                </span>

                <span className="font-semibold">
                  80%
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Skill Gap
                </span>

                <span className="text-orange-400 font-semibold">
                  {getGap()}%
                </span>

              </div>

            </div>

          </div>

          {/* Recommendation */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold">
              AI Learning Recommendation
            </h2>

            <p className="text-slate-400 mt-3 leading-relaxed">
              Based on your {selectedCourse} assessment score, continue
              with personalized learning resources to reduce your skill gap.
            </p>

            <button
              onClick={handleRecommendations}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
            >
              View Recommendations →
            </button>

          </div>

        </div>

        {/* ================= NEXT ACTIONS ================= */}

        <div className="mt-8">

          <h2 className="text-xl font-semibold">
            Continue Your Learning
          </h2>

          <div className="flex flex-wrap gap-4 mt-5">

            <button
              onClick={() => navigate("/competency")}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold transition"
            >
              📊 View Competency Profile
            </button>

            <button
              onClick={() => navigate("/skill-gap")}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold transition"
            >
              🎯 View Skill Gap
            </button>

            <button
              onClick={() => navigate("/learning")}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold transition"
            >
              📚 My Learning
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold transition"
            >
              ← Dashboard
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Result;
