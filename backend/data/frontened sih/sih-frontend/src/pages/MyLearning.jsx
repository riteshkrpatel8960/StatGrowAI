import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyLearning() {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const courses = [
    {
      id: 1,
      title: "SQL Fundamentals",
      level: "Beginner",
      progress: 0,
      duration: "4 Weeks",
      lessons: 12,
      description:
        "Learn SQL basics, queries, filtering, joins, grouping and relational database concepts.",
      status: "Not Started",
    },
    {
      id: 2,
      title: "Data Structures",
      level: "Intermediate",
      progress: 25,
      duration: "6 Weeks",
      lessons: 18,
      description:
        "Strengthen arrays, linked lists, stacks, queues, trees and graphs.",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Python Programming",
      level: "Beginner",
      progress: 60,
      duration: "5 Weeks",
      lessons: 15,
      description:
        "Improve Python programming through practical coding and problem solving.",
      status: "In Progress",
    },
  ];

  const openCourse = (course) => {
    localStorage.setItem(
      "selectedCourse",
      course.title
    );

    navigate("/course");
  };

  const startAssessment = () => {
    if (!selectedCourse) {
      alert("Please select a course first.");
      return;
    }

    localStorage.setItem(
      "selectedCourse",
      selectedCourse.title
    );

    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="bg-slate-900 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <p className="text-blue-400">
              Learning Center
            </p>

            <h1 className="text-3xl font-bold">
              My Learning
            </h1>

            <p className="text-slate-400 mt-1">
              Continue your personalized learning journey.
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

        {/* Overall */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                Overall Learning Progress
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Keep learning to improve your competencies.
              </p>
            </div>

            <span className="text-2xl font-bold text-blue-400">
              28%
            </span>

          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full mt-5">

            <div
              className="h-3 bg-blue-600 rounded-full"
              style={{ width: "28%" }}
            />

          </div>

        </div>

        {/* Courses */}

        <h2 className="text-2xl font-bold mt-10">
          Your Courses
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

          {courses.map((course) => (

            <div
              key={course.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >

              <div className="flex justify-between">

                <span className="text-xs text-blue-400 font-semibold">
                  {course.status.toUpperCase()}
                </span>

                <span className="text-xs text-slate-500">
                  {course.level}
                </span>

              </div>

              <h3 className="text-xl font-bold mt-4">
                {course.title}
              </h3>

              <p className="text-slate-400 text-sm mt-3">
                {course.description}
              </p>

              <div className="flex justify-between text-sm text-slate-400 mt-5">
                <span>⏱ {course.duration}</span>
                <span>📚 {course.lessons}</span>
              </div>

              <div className="mt-5">

                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="h-2 bg-slate-800 rounded-full">

                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />

                </div>

              </div>

              <button
                onClick={() => {
                  setSelectedCourse(course);
                }}
                className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
              >
                {course.progress === 0
                  ? "Start Learning"
                  : "Continue Learning"}
              </button>

            </div>

          ))}

        </div>

        {/* Selected Course */}

        {selectedCourse && (

          <div className="mt-8 bg-slate-900 border border-blue-500/30 rounded-2xl p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-blue-400 text-sm">
                  SELECTED COURSE
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {selectedCourse.title}
                </h2>

              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 text-xl"
              >
                ✕
              </button>

            </div>

            <div className="flex flex-wrap gap-4 mt-6">

              <button
                onClick={() =>
                  openCourse(selectedCourse)
                }
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
              >
                ▶ Start Course
              </button>

              <button
                onClick={startAssessment}
                className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl font-semibold"
              >
                📝 Take Assessment
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default MyLearning;