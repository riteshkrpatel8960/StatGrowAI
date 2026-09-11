import { useNavigate } from "react-router-dom";

function SkillGap() {
  const navigate = useNavigate();

  const gaps = [
    {
      skill: "SQL",
      current: 52,
      target: 80,
      priority: "HIGH",
    },
    {
      skill: "Data Structures",
      current: 65,
      target: 85,
      priority: "MEDIUM",
    },
    {
      skill: "Communication",
      current: 70,
      target: 75,
      priority: "LOW",
    },
    {
      skill: "Problem Solving",
      current: 76,
      target: 85,
      priority: "MEDIUM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-blue-400">
              Competency Analysis
            </p>

            <h1 className="text-3xl font-bold">
              Skill Gap Analysis
            </h1>
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-bold">
            Your Skill Gaps
          </h2>

          <p className="text-slate-400 mt-2">
            These skills require improvement to reach your target competency.
          </p>

        </div>

        <div className="space-y-5">

          {gaps.map((item) => {

            const gap = item.target - item.current;

            return (
              <div
                key={item.skill}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <h3 className="text-xl font-semibold">
                        {item.skill}
                      </h3>

                      <span
                        className={`text-xs font-bold ${
                          item.priority === "HIGH"
                            ? "text-red-400"
                            : item.priority === "MEDIUM"
                            ? "text-orange-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm mt-4">

                      <span className="text-slate-400">
                        Current: {item.current}%
                      </span>

                      <span className="text-slate-400">
                        Target: {item.target}%
                      </span>

                    </div>

                    <div className="w-full h-3 bg-slate-800 rounded-full mt-2">

                      <div
                        className="h-3 bg-blue-600 rounded-full"
                        style={{
                          width: `${item.current}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="text-center md:w-32">

                    <p className="text-3xl font-bold text-orange-400">
                      {gap}%
                    </p>

                    <p className="text-xs text-slate-500">
                      Skill Gap
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        <button
          onClick={() => navigate("/recommendations")}
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
        >
          Get AI Recommendations →
        </button>

      </main>

    </div>
  );
}

export default SkillGap;