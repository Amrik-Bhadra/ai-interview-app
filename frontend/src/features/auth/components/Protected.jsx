import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ScreenLoader from "../components/ScreenLoader";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ScreenLoader label="Checking your session" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;