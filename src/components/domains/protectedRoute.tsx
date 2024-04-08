import { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }: { children: ReactElement }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
