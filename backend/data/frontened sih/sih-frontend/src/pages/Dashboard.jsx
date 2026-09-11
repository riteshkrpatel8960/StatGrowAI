import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem("diagnosticScore");

    if (savedScore) {
      const percentage = Math.round((Number(savedScore) / 10) * 100);
      setScore(percentage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("diagnosticScore");
    localStorage.removeItem("assessmentScore");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================= SIDEBAR ================= */}

      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col fixed left-0 top-0 bottom-0">

        {/* Logo */}

        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">
            SIH AI Platform
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Competency Learning
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 p-4 space-y-2">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium"
          >
            <span>🏠</span>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/competency")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>📊</span>
            Competency Profile
          </button>

          <button
            onClick={() => navigate("/skill-gap")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>🎯</span>
            Skill Gap
          </button>

          <button
            onClick={() => navigate("/recommendations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>🤖</span>
            AI Recommendations
          </button>

          <button
            onClick={() => navigate("/learning")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>📚</span>
            My Learning
          </button>

          <button
            onClick={() => navigate("/assessment")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <span>📝</span>
            Assessments
          </button>

        </nav>

        {/* Logout */}

        <div className="p-4 border-t border-slate-800">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <div className="flex-1 md:ml-64">

        {/* HEADER */}

        <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

          <div>
            <h1 className="text-xl font-bold">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">

            <span className="hidden sm:block text-sm text-slate-400">
              Welcome, Student
            </span>

            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              S
            </div>

          </div>

        </header>

        {/* MAIN */}

        <main className="p-6 md:p-8 max-w-7xl mx-auto">

          {/* Welcome */}

          <div className="mb-8">

            <p className="text-blue-400 font-medium">
              Student Dashboard
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Welcome back! 👋
            </h2>

            <p className="text-slate-400 mt-2">
              Track your competency, identify skill gaps and continue learning.
            </p>

          </div>

          {/* ================= STAT CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Competency */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <p className="text-slate-400">
                Overall Competency
              </p>

              <div className="flex items-end gap-2 mt-3">

                <h3 className="text-4xl font-bold">
                  {score}%
                </h3>

                <span className="text-green-400 text-sm mb-1">
                  Diagnostic
                </span>

              </div>

              <div className="mt-4 w-full bg-slate-800 rounded-full h-2">

                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

            {/* Skills */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <p className="text-slate-400">
                Skills Assessed
              </p>

              <h3 className="text-4xl font-bold mt-3">
                10
              </h3>

              <p className="text-slate-500 mt-2">
                Based on diagnostic assessment
              </p>

            </div>

            {/* Learning */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <p className="text-slate-400">
                Learning Progress
              </p>

              <h3 className="text-4xl font-bold mt-3">
                28%
              </h3>

              <p className="text-slate-500 mt-2">
                Continue your recommended courses
              </p>

            </div>

          </div>

          {/* ================= PROFILE + SKILL GAP ================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* Competency Profile */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-semibold">
                    Competency Profile
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Your current skill levels
                  </p>

                </div>

                <button
                  onClick={() => navigate("/competency")}
                  className="text-blue-400 text-sm hover:text-blue-300"
                >
                  View Profile →
                </button>

              </div>

              <div className="mt-6 space-y-5">

                {/* Python */}

                <div>

                  <div className="flex justify-between mb-2">
                    <span>Python</span>
                    <span className="text-slate-400">
                      82%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full">

                    <div className="h-2 bg-blue-600 rounded-full w-[82%]" />

                  </div>

                </div>

                {/* DSA */}

                <div>

                  <div className="flex justify-between mb-2">
                    <span>Data Structures</span>
                    <span className="text-slate-400">
                      65%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full">

                    <div className="h-2 bg-blue-600 rounded-full w-[65%]" />

                  </div>

                </div>

                {/* SQL */}

                <div>

                  <div className="flex justify-between mb-2">
                    <span>SQL</span>
                    <span className="text-slate-400">
                      52%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full">

                    <div className="h-2 bg-blue-600 rounded-full w-[52%]" />

                  </div>

                </div>

                {/* Communication */}

                <div>

                  <div className="flex justify-between mb-2">
                    <span>Communication</span>
                    <span className="text-slate-400">
                      70%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-800 rounded-full">

                    <div className="h-2 bg-blue-600 rounded-full w-[70%]" />

                  </div>

                </div>

              </div>

            </div>

            {/* Skill Gap */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-semibold">
                    Skill Gap Analysis
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Skills that need improvement
                  </p>

                </div>

                <button
                  onClick={() => navigate("/skill-gap")}
                  className="text-blue-400 text-sm hover:text-blue-300"
                >
                  View All →
                </button>

              </div>

              <div className="mt-6 space-y-4">

                {/* SQL */}

                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">

                  <div>

                    <p className="font-medium">
                      SQL
                    </p>

                    <p className="text-sm text-slate-400">
                      Current: 52% · Target: 80%
                    </p>

                  </div>

                  <span className="text-red-400 font-semibold">
                    28% Gap
                  </span>

                </div>

                {/* DSA */}

                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">

                  <div>

                    <p className="font-medium">
                      Data Structures
                    </p>

                    <p className="text-sm text-slate-400">
                      Current: 65% · Target: 85%
                    </p>

                  </div>

                  <span className="text-orange-400 font-semibold">
                    20% Gap
                  </span>

                </div>

                {/* Communication */}

                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">

                  <div>

                    <p className="font-medium">
                      Communication
                    </p>

                    <p className="text-sm text-slate-400">
                      Current: 70% · Target: 75%
                    </p>

                  </div>

                  <span className="text-yellow-400 font-semibold">
                    5% Gap
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================= RECOMMENDATIONS ================= */}

          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-xl font-semibold">
                  Recommended Learning
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Personalized based on your skill gaps
                </p>

              </div>

              <button
                onClick={() => navigate("/recommendations")}
                className="text-blue-400 text-sm hover:text-blue-300"
              >
                View All →
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {/* SQL */}

              <div className="bg-slate-800 rounded-xl p-5">

                <span className="text-xs text-red-400 font-semibold">
                  HIGH PRIORITY
                </span>

                <h4 className="text-lg font-semibold mt-2">
                  SQL Fundamentals
                </h4>

                <p className="text-slate-400 text-sm mt-2">
                  Improve your SQL competency and reduce your current skill gap.
                </p>

                <button
                  onClick={() => navigate("/learning")}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold"
                >
                  Start Learning
                </button>

              </div>

              {/* DSA */}

              <div className="bg-slate-800 rounded-xl p-5">

                <span className="text-xs text-orange-400 font-semibold">
                  MEDIUM PRIORITY
                </span>

                <h4 className="text-lg font-semibold mt-2">
                  Data Structures
                </h4>

                <p className="text-slate-400 text-sm mt-2">
                  Strengthen your DSA concepts through guided learning.
                </p>

                <button
                  onClick={() => navigate("/learning")}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold"
                >
                  Start Learning
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;
