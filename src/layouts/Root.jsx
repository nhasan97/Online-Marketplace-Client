import { Outlet } from "react-router-dom";
import Footer from "../reusableComponents/Footer";

const Root = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-20">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Root;
