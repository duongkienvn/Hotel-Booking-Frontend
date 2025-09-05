import NavBar from "./NavBar.jsx";
import AppFooter from "./Footer.jsx";
import {Outlet, useLocation} from "react-router-dom";

function DefaultLayout() {
  const location = useLocation();
  const hideFooter = ["/login", "/register",
    "/verify-account", "/verify-success", "/users/verify/account", "/verify-failed", "/find-booking"].includes(location.pathname);
  const hideHeader = ["/verify-success", "/verify-failed"].includes(location.pathname);

  return <>
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      {!hideHeader && <NavBar/>}
      <main className={"main-container"}>
        <Outlet/>
      </main>
      {!hideFooter && <AppFooter />}
    </div>
  </>
}

export default DefaultLayout;