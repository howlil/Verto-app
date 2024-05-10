import { Navigate, useLocation } from "react-router-dom";

const checkAuthToken = () => !!localStorage.getItem("authToken");

export function ProtectRoute({ children }) {
  const location = useLocation();
  if (!checkAuthToken()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
