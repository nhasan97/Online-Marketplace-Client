import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-20">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
