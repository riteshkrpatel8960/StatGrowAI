import { useNavigate } from "react-router-dom";

function CompetencyProfile() {
  const navigate = useNavigate();

  const skills = [
    {
      name: "Python",
      score: 82,
      target: 85,
    },
    {
      name: "Data Structures",
      score: 65,
      target: 85,
    },
    {
      name: "SQL",
      score: 52,
      target: 80,
    },
    {
      name: "Communication",
      score: 70,
      target: 75,
    },
    {
      name: "Problem Solving",
      score: 76,
      target: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <p className="text-blue-400 font-medium">
              Student Profile
            </p>

            <h1 className="text-3xl font-bold">
              Competency Profile
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

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Overall Competency
            </p>

            <h2 className="text-4xl font-bold mt-3">
              69%
            </h2>

            <p className="text-green-400 mt-2">
              +8% improvement
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Strongest Skill
            </p>

            <h2 className="text-2xl font-bold mt-3">
              Python
            </h2>

            <p className="text-blue-400 mt-2">
              82% competency
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Priority Skill
            </p>

            <h2 className="text-2xl font-bold mt-3">
              SQL
            </h2>

            <p className="text-red-400 mt-2">
              28% skill gap
            </p>
          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold">
            Skill Competency
          </h2>

          <p className="text-slate-400 mt-1">
            Current competency compared with target level.
          </p>

          <div className="mt-8 space-y-7">

            {skills.map((skill) => {

              const gap = Math.max(
                0,
                skill.target - skill.score
              );

              return (
                <div key={skill.name}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {skill.name}
                    </span>

                    <span className="text-slate-400">
                      {skill.score}% / {skill.target}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-slate-800 rounded-full">

                    <div
                      className="h-3 bg-blue-600 rounded-full"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />

                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    {gap === 0
                      ? "Target achieved"
                      : `${gap}% remaining to target`}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={() => navigate("/skill-gap")}
            className="px-5 py-3 bg-blue-600 rounded-xl font-semibold"
          >
            View Skill Gap →
          </button>

          <button
            onClick={() => navigate("/recommendations")}
            className="px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl font-semibold"
          >
            AI Recommendations →
          </button>

        </div>

      </main>

    </div>
  );
}

export default CompetencyProfile;