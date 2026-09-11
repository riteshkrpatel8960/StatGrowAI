import { useNavigate } from "react-router-dom";

function Recommendations() {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: "SQL Fundamentals",
      skill: "SQL",
      gap: "28%",
      priority: "HIGH PRIORITY",
      color: "text-red-400",
      description:
        "Improve SQL queries, joins, filtering, grouping and database fundamentals.",
    },
    {
      title: "Data Structures",
      skill: "Data Structures",
      gap: "20%",
      priority: "MEDIUM PRIORITY",
      color: "text-orange-400",
      description:
        "Strengthen arrays, linked lists, stacks, queues, trees and graphs.",
    },
    {
      title: "Problem Solving",
      skill: "Problem Solving",
      gap: "9%",
      priority: "MEDIUM PRIORITY",
      color: "text-orange-400",
      description:
        "Practice logical thinking and algorithmic problem solving.",
    },
  ];

  const startCourse = (course) => {
    localStorage.setItem("selectedCourse", course);
    navigate("/course");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-blue-400">
              AI Learning Engine
            </p>

            <h1 className="text-3xl font-bold">
              AI Recommendations
            </h1>

            <p className="text-slate-400 mt-1">
              Personalized learning based on your skill gaps.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-slate-800 rounded-lg"
          >
            ← Dashboard
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8">

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 mb-8">

          <h2 className="text-xl font-semibold">
            🤖 AI Learning Plan
          </h2>

          <p className="text-slate-400 mt-2">
            Based on your competency profile, SQL is currently your highest priority skill.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {recommendations.map((item) => (

            <div
              key={item.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >

              <span className={`text-xs font-bold ${item.color}`}>
                {item.priority}
              </span>

              <h2 className="text-xl font-bold mt-3">
                {item.title}
              </h2>

              <p className="text-slate-400 text-sm mt-3">
                {item.description}
              </p>

              <div className="mt-5 bg-slate-800 rounded-xl p-4">

                <div className="flex justify-between">

                  <span className="text-slate-400">
                    Skill Gap
                  </span>

                  <span className="text-orange-400 font-bold">
                    {item.gap}
                  </span>

                </div>

              </div>

              <button
                onClick={() => startCourse(item.title)}
                className="w-full mt-5 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
              >
                Start Learning →
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Recommendations;