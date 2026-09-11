import { useNavigate } from "react-router-dom";

function Evidence() {
  const navigate = useNavigate();

  const evidence = [
    {
      skill: "SQL",
      assessment: "SQL Fundamentals Assessment",
      score: 72,
      status: "Verified",
    },
    {
      skill: "Data Structures",
      assessment: "DSA Assessment",
      score: 65,
      status: "Verified",
    },
    {
      skill: "Python",
      assessment: "Python Assessment",
      score: 82,
      status: "Verified",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-blue-400">
              Competency Evidence
            </p>

            <h1 className="text-3xl font-bold">
              Evidence & Evaluation
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Competency Evidence
          </h2>

          <p className="text-slate-400 mt-2">
            Assessment results used to support your competency profile.
          </p>

          <div className="mt-6 space-y-4">

            {evidence.map((item) => (

              <div
                key={item.skill}
                className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <h3 className="font-semibold text-lg">
                    {item.skill}
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    {item.assessment}
                  </p>

                </div>

                <div className="flex items-center gap-6">

                  <span className="text-blue-400 font-bold">
                    {item.score}%
                  </span>

                  <span className="text-green-400 text-sm">
                    ✓ {item.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Evidence;