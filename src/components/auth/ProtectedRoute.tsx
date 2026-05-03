import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "@/lib/authToken";

/**
 * Client-side route guard. NOTE: This is a UX guard only — all sensitive
 * operations MUST also be authorized server-side. Client checks can be
 * bypassed by a determined user, so never rely on this alone for security.
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;