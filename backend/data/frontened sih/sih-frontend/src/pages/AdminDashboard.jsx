import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-purple-400">
              Administration
            </p>

            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-slate-800 rounded-lg"
          >
            Logout
          </button>

        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8">

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Learning Materials
            </p>
            <h2 className="text-4xl font-bold mt-3">
              24
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Generated Quizzes
            </p>
            <h2 className="text-4xl font-bold mt-3">
              18
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Pending Reviews
            </p>
            <h2 className="text-4xl font-bold mt-3">
              5
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <button
            onClick={() => navigate("/admin/upload")}
            className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500"
          >
            <span className="text-3xl">
              📤
            </span>

            <h2 className="text-xl font-bold mt-4">
              Upload Material
            </h2>

            <p className="text-slate-400 mt-2">
              Upload PDFs and learning resources.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/generate")}
            className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500"
          >
            <span className="text-3xl">
              🤖
            </span>

            <h2 className="text-xl font-bold mt-4">
              AI Quiz Generator
            </h2>

            <p className="text-slate-400 mt-2">
              Generate assessment questions using AI.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/review")}
            className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500"
          >
            <span className="text-3xl">
              📝
            </span>

            <h2 className="text-xl font-bold mt-4">
              Review Quizzes
            </h2>

            <p className="text-slate-400 mt-2">
              Review, edit, approve or reject quizzes.
            </p>
          </button>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;