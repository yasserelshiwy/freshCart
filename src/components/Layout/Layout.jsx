import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-[#0a0e16] ">
        <div className="back-ground-sit backdrop-blur-xl ">
          <div className="container min-h-[67.5vh] px-3 pb-12 pt-24 ">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
