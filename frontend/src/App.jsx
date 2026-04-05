import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useChat } from "./context/ChatContext.jsx";
import LogIn from "./pages/LogIn.jsx";
import ChatLayout from "./components/ChatLayout.jsx";
import ChatDashboard from "./pages/ChatDashboard.jsx"; // Will create

import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ChatDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            <ProtectedRoute>
              <ChatLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
