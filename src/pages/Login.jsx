import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import loginBg from "../assets/undraw_Login_re_4vu2.png";

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
    <div className="max-w-screen-xl mx-auto px-20">
      <div className="w-full h-screen flex flex-col justify-center items-center mt-16 bg-[url('../public/logbg1.jpg')] bg-contain bg-no-repeat bg-right">
        <div className="w-[50%] flex flex-col justify-center items-center px-10 pb-5 border rounded-lg">
          <img src={loginBg} alt="" className="w-3/4" />

          <form
            className="flex flex-col gap-5 text-left w-full"
            onSubmit={handleLoginWithEmailAndPassword}
          >
            <h1 className="text-[#444] text-[30px] font-semibold text-center">
              Login
            </h1>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-s-full">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                type="email"
                id="in1"
                name="email"
                placeholder="Email"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-full border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-s-full">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>
              <input
                type={showPass ? "text" : "password"}
                id="in2"
                name="pass"
                placeholder="Password"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-full border focus:border-[#7DDDD9] focus:outline-none"
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

            {loginError && (
              <p className="text-red-500 text-center font-bold">{loginError}</p>
            )}

            <input
              type="submit"
              value="Sign In"
              className="btn w-1/2 mx-auto bg-[#323484] text-lg font-medium text-white hover:text-[#323484] normal-case rounded-full"
            />
          </form>

          <div className="flex flex-col justify-center items-center mt-5 space-y-5">
            <p className="text-base font-medium">Or Sign In with</p>
            <div className="flex gap-3">
              <button
                className="btn btn-circle bg-[#ff5c11dc] text-white hover:text-[#ff5c11dc]"
                onClick={handleLoginWithGoogle}
              >
                <i className="fa-brands fa-google text-xl"></i>
              </button>
              <button
                className="btn btn-circle hidden"
                onClick={handleLoginWithGitHub}
              >
                <i className="fa-brands fa-github text-xl"></i>
              </button>
            </div>
            <p className="text-base font-medium">
              Dont have an account?
              <Link className="ml-3 text-[#ff5c11dc]" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
