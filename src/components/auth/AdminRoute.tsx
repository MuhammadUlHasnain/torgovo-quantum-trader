import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/** UX gate only — the backend returns 403 to non-staff regardless. */
const AdminRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }
  if (user?.is_staff !== true) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

export default AdminRoute;
