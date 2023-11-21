import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/chart";

  return (
    <>
      <main className="App">
        {!hideNavbar && <Navbar />}
        <Outlet />
        {!hideFooter && <Footer />}
      </main>
    </>
  );
};

export default Layout;
