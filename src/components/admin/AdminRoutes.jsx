import {getUserRole, isTokenValid} from "../utils/Helper.js";
import {Navigate, Outlet} from "react-router-dom";

function AdminRoutes() {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  const roles = getUserRole(token);
  if (!roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoutes;