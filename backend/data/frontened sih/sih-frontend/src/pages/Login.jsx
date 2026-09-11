import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Abhi testing ke liye direct Diagnostic Quiz par jayega
    navigate("/diagnostic");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-700 to-indigo-900">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-white">AI</span>
          </div>

          <h1 className="text-4xl font-bold text-white">
            SIH AI Platform
          </h1>

          <p className="mt-4 text-blue-100 text-lg leading-relaxed">
            Competency-based learning powered by intelligent skill
            assessment and personalized recommendations.
          </p>

          <div className="mt-8 space-y-4 text-blue-50">
            <p>✓ Identify your skill gaps</p>
            <p>✓ Get personalized learning</p>
            <p>✓ Track competency growth</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">

            <h2 className="text-3xl font-bold text-white">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-400">
              Sign in to continue your learning journey.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Sign In
              </button>

            </form>

            <p className="mt-8 text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <span className="text-blue-400 font-semibold cursor-pointer">
                Create account
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;