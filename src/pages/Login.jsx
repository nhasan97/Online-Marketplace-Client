import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { loginWithEmailPassword, loginWithGoogle, loginWithGitHub } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  //================== Login using Email and Password ==================
  const handleLoginWithEmailAndPassword = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.pass.value;

    setLoginError("");

    loginWithEmailPassword(email, password)
      .then((result) => {
        form.reset();
        if (result?.user?.email) {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((err) => setLoginError(err.code + "---" + err.message));
  };

  //================== Login using Google ==================
  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    loginWithGoogle(provider)
      .then((result) => {
        if (result?.user?.email) {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((err) => {
        setLoginError(err.code + "---" + err.message);
      });
  };

  //================== Login using Github ==================
  const handleLoginWithGitHub = () => {
    const provider = new GithubAuthProvider();

    loginWithGitHub(provider)
      .then((result) => {
        if (result?.user?.email) {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((err) => {
        setLoginError(err.code + "---" + err.message);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-center px-10 py-5 space-y-7 border rounded-lg">
        <form
          className="flex flex-col gap-7 text-left w-full"
          onSubmit={handleLoginWithEmailAndPassword}
        >
          <h1 className="text-[#444] text-[40px] font-semibold text-center">
            Login
          </h1>

          <label htmlFor="in1" className="">
            Email
            <input
              type="email"
              id="in1"
              name="email"
              placeholder="Type Here"
              required
              className="input input-bordered w-full"
            />
          </label>

          <label htmlFor="in2" className="">
            Confirm Password
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="in2"
                name="pass"
                placeholder="Type Here"
                required
                className="input input-bordered w-full"
              />
              <span
                className="text-2xl absolute right-4 top-0 translate-y-[50%]"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <AiFillEyeInvisible></AiFillEyeInvisible>
                ) : (
                  <AiFillEye></AiFillEye>
                )}
              </span>
            </div>
          </label>

          {loginError && (
            <p className="text-red-500 text-center font-bold">{loginError}</p>
          )}

          <input
            type="submit"
            value="Sign In"
            className="input w-full bg-[#FF3811] text-white"
          />
        </form>

        <p>Or Sign In with</p>
        <div className="flex gap-3">
          <button className="btn btn-circle" onClick={handleLoginWithGoogle}>
            <i className="fa-brands fa-google text-xl"></i>
          </button>
          <button className="btn btn-circle" onClick={handleLoginWithGitHub}>
            <i className="fa-brands fa-github text-xl"></i>
          </button>
        </div>
        <p className="my-6">
          Dont have an account?
          <Link className="text-[#FF3811]" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
