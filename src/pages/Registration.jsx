import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import regBg from "../assets/Sign up-amico.png";

import { updateProfile } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";
import { showToastOnSuccess } from "../utilities/displayToast";
import { uploadImage } from "../utilities/imageUploader";
import { saveUserData } from "../api/authAPIs";

const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const { registerWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  //================== Register using Email and Password ==================
  const handleRegisterWithEmailAndPassword = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.pass.value;
    const photo = form.photo.files[0];
    const role = form.role.value;

    setSignUpError("");

    if (password.length < 6) {
      setSignUpError("Password must have at least 6 characters!");
    } else if (/[A-Z]/.test(password) === false) {
      setSignUpError("At least 1 uppercase letter is required!");
    } else if (/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/.test(password) === false) {
      setSignUpError("Password must have at least 1 special character!");
    } else {
      try {
        let photoUrl = "";

        if (photo) {
          const imageData = await uploadImage(photo);
          photoUrl = imageData?.data?.display_url;
        } else {
          photoUrl = "https://i.ibb.co/tB5R1JC/user.png";
        }

        registerWithEmailPassword(email, password)
          .then((result) => {
            const user = result.user;
            updateProfile(user, {
              displayName: name,
              photoURL: photoUrl,
            })
              .then(async () => {
                const dbResponse = await saveUserData(result?.user, role);
                console.log(dbResponse);
                showToastOnSuccess("Account created Successfully!");
                form.reset();
                navigate("/");
              })
              .catch((err) => setSignUpError(err.code + "---" + err.message));
          })
          .catch((err) => {
            setSignUpError(err.code + "---" + err.message);
          });
      } catch (err) {
        setSignUpError(err.code + "---" + err.message);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-20">
      <div className="w-full h-screen flex justify-center items-center mt-16 bg-[url('../public/logbg1.jpg')] bg-contain bg-no-repeat bg-right">
        <div className="w-[60%] flex flex-col justify-center items-center px-10 pb-5 border rounded-lg">
          <form
            className="w-full flex flex-col gap-4 text-left"
            onSubmit={handleRegisterWithEmailAndPassword}
          >
            <h1 className="text-[#444] text-[40px] font-semibold text-center">
              Sign UP
            </h1>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-s-full">
                <i className="fa-solid fa-signature text-xl text-white"></i>
              </div>
              <input
                type="text"
                id="in1"
                name="name"
                placeholder="Name"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-full border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

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

            <fieldset className="w-full p-1 space-y-2 border rounded-lg">
              <legend className="text-[#8b8b8b] text-base">
                Choose your role
              </legend>

              <div className="w-full flex">
                <div className="flex-1 flex items-center text-base">
                  <input
                    type="radio"
                    name="role"
                    value="freelancer"
                    required
                    className="radio radio-primary"
                  />
                  <label htmlFor="rad2" className="ml-3">
                    Freelancer
                  </label>
                </div>
                <div className="flex-1 flex items-center text-base">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    required
                    className="radio radio-primary"
                  />
                  <label htmlFor="rad1" className="ml-3">
                    Buyer
                  </label>
                </div>
                <div className="flex-1 flex items-center text-base">
                  <input
                    type="radio"
                    name="role"
                    value="both"
                    required
                    className="radio radio-primary"
                  />
                  <label htmlFor="rad2" className="ml-3">
                    Both
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base">
                  Pick your profile picture
                </span>
              </label>
              <input
                type="file"
                name="photo"
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* <div className="w-full flex gap-4 justify-start items-center">
            <input
              type="checkbox"
              name="termsCheck"
              id="terms"
              className="w-5 h-5"
            />
            <label htmlFor="terms">Accept terms and conditions?</label>
          </div> */}

            {signUpError && (
              <p className="text-red-500 text-center font-bold">
                {signUpError}
              </p>
            )}

            <input
              type="submit"
              value="Sign Up"
              className="btn w-1/2 mx-auto bg-[#323484] text-lg font-medium text-white hover:text-[#323484] normal-case rounded-full"
            />
          </form>
          <p className="my-6 text-center font-medium">
            Already have an account?
            <Link className="ml-3 text-[#ff5c11dc]" to="/login">
              Sign In
            </Link>
          </p>
        </div>
        <div className="w-[40%] flex justify-center items-center">
          <img src={regBg} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
