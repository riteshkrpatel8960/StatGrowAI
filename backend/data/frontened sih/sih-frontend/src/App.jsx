import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import DiagnosticQuiz from "./pages/DiagnosticQuiz";
import Dashboard from "./pages/Dashboard";
import CompetencyProfile from "./pages/CompetencyProfile";
import SkillGap from "./pages/SkillGap";
import Recommendations from "./pages/Recommendations";
import MyLearning from "./pages/MyLearning";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";
import CourseLearning from "./pages/CourseLearning";
import AdminDashboard from "./pages/AdminDashboard";
import UploadMaterial from "./pages/UploadMaterial";
import QuizGenerator from "./pages/QuizGenerator";
import QuizReview from "./pages/QuizReview";
import Evidence from "./pages/Evidence";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/diagnostic"
          element={<DiagnosticQuiz />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/competency"
          element={<CompetencyProfile />}
        />

        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/learning"
          element={<MyLearning />}
        />

        <Route
          path="/course"
          element={<CourseLearning />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/result"
          element={<Result />}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/upload"
          element={<UploadMaterial />}
        />

        <Route
          path="/admin/generate"
          element={<QuizGenerator />}
        />

        <Route
          path="/admin/review"
          element={<QuizReview />}
        />

        {/* Evidence */}

        <Route
          path="/evidence"
          element={<Evidence />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;