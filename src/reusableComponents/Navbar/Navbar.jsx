import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { user, LogOutUser } = useContext(AuthContext);

  // console.log(user);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/add-jobs">Add job</NavLink>
      </li>
      <li>
        <NavLink to="/my-posted-jobs">My posted jobs</NavLink>
      </li>
      <li>
        <NavLink to="/">My Bids</NavLink>
      </li>
      <li>
        <NavLink to="/">Bid Requests</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    LogOutUser()
      .then()
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div className="navbar max-w-screen-xl px-20 bg-[rgba(255,255,255,.5)] absolute z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <div className="flex justify-center items-center gap-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
              </div>
            </label>
            <p className="border-l-2 p-2">{user.displayName}</p>
            <button
              className="btn btn-circle border-none bg-[#ff5c11dc] text-white hover:text-[#323484]"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="text-2xl"></AiOutlineLogout>
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Link
              className="btn border-none bg-[#323484] text-white hover:text-[#323484]"
              to="/login"
            >
              <AiOutlineLogin className="text-2xl"></AiOutlineLogin>
            </Link>
            <Link
              className="btn border-none bg-[#323484] text-white hover:text-[#323484]"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
