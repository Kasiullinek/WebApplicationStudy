import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";
import type { ProtectedRouteProps } from "../interfaces/ProtectedRouteProps";

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { role } = useUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
