import { Outlet } from "react-router-dom";
import TopBar from "../utils/TopBar";
import Navbar from "../utils/NavBar";
import Footer from "../utils/Footer";

const PublicLayout = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default PublicLayout;