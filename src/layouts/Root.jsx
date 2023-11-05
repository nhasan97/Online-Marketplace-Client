import { Outlet } from "react-router-dom";
import Footer from "../reusableComponents/Footer";
import Navbar from "../reusableComponents/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <div className="flex justify-center relative">
        <Navbar></Navbar>
      </div>
      <div className="max-w-screen-xl mx-auto px-20">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
