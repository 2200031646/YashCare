import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const loggedInUser = JSON.parse(
    localStorage.getItem("yashcareLoggedInUser") || "null"
  );

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(loggedInUser.role)) {

    if (loggedInUser.role === "Donor") {
      return <Navigate to="/campaigns" replace />;
    }

    if (loggedInUser.role === "Admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;