import {Navigate, Outlet} from "react-router-dom";
import {isTokenValid} from "../utils/Helper.js";

function PrivateRoutes() {
  const token = localStorage.getItem("token");
  const isLoggedIn = token && isTokenValid(token);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace/>;
  }

  return <Outlet/>;
}

export default PrivateRoutes;