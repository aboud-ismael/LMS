import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import ProfileForm from "./components/profile/ProfileForm";
import CourseView from "./components/courses/CourseView";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLoginForm from "./components/auth/AdminLoginForm";
import { useAuth } from "./components/auth/AuthProvider";
import routes from "tempo-routes";

function App() {
  const { session, isAdmin } = useAuth();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Tempo routes need to be before other routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route
            path="/"
            element={session ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoginForm />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              !session ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <SignUpForm />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reset-password"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <ResetPasswordForm />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              session ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <ProfileForm />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              session ? <CourseView /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
