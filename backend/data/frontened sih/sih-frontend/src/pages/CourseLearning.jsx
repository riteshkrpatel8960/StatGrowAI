import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseLearning() {
  const navigate = useNavigate();

  const [completed, setCompleted] = useState([]);

  const course =
    localStorage.getItem("selectedCourse") ||
    "SQL Fundamentals";

  const modules = [
    {
      id: 1,
      title: "Introduction & Fundamentals",
      description:
        "Understand the basic concepts and terminology.",
    },
    {
      id: 2,
      title: "Core Concepts",
      description:
        "Learn the important concepts required for practical implementation.",
    },
    {
      id: 3,
      title: "Practical Examples",
      description:
        "Apply your knowledge through practical examples.",
    },
    {
      id: 4,
      title: "Practice",
      description:
        "Solve practice problems and strengthen your understanding.",
    },
  ];

  const completeModule = (id) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
  };

  const progress = Math.round(
    (completed.length / modules.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-blue-400">
              Learning Course
            </p>

            <h1 className="text-3xl font-bold">
              {course}
            </h1>
          </div>

          <button
            onClick={() => navigate("/learning")}
            className="px-4 py-2 bg-slate-800 rounded-lg"
          >
            ← My Learning
          </button>

        </div>

      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-8">

        {/* Progress */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                Course Progress
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Complete the modules to improve your competency.
              </p>
            </div>

            <span className="text-2xl font-bold text-blue-400">
              {progress}%
            </span>

          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full mt-5">

            <div
              className="h-3 bg-blue-600 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Modules */}

        <div className="mt-8 space-y-4">

          {modules.map((module) => {

            const isCompleted =
              completed.includes(module.id);

            return (
              <div
                key={module.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <span className="text-blue-400 text-sm">
                      MODULE {String(module.id).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-semibold mt-1">
                      {module.title}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      {module.description}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      completeModule(module.id)
                    }
                    disabled={isCompleted}
                    className={`px-5 py-3 rounded-xl font-semibold ${
                      isCompleted
                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isCompleted
                      ? "✓ Completed"
                      : "Complete Module"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* Assessment */}

        <div className="mt-8 bg-slate-900 border border-blue-600/30 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Ready for Assessment?
          </h2>

          <p className="text-slate-400 mt-2">
            Test your knowledge after completing the learning modules.
          </p>

          <button
            onClick={() => navigate("/assessment")}
            className="mt-5 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
          >
            📝 Take Assessment →
          </button>

        </div>

      </main>

    </div>
  );
}

export default CourseLearning;