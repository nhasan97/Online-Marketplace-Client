import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdTitle, MdDescription, MdPriceChange } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import addJobBg from "../assets/Screenshot_2023-11-06_194840-removebg-preview.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddJobs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const toastCharacteristics = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handlePostJob = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value || "Not Found";
    const jobTitle = form.jobTitle.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";
    const description = form.description.value || "Not Found";
    const category = form.category.value || "Not Found";
    const minimumPrice = form.minimumPrice.value || "Not Found";
    const maximumPrice = form.maximumPrice.value || "Not Found";

    const jobInfo = {
      email,
      jobTitle,
      deadline,
      description,
      category,
      minimumPrice,
      maximumPrice,
    };

    axios.post("http://localhost:5000/posted-jobs", jobInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Inserted successfully!", toastCharacteristics);
        form.reset();
        navigate("/my-posted-jobs");
      } else {
        toast.error("Something went wrong!", toastCharacteristics);
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-20">
      <div className="w-full h-screen flex justify-center items-center mt-16">
        <div className="w-[40%] h-[420px] p-16 flex justify-center items-center bg-[#323484] border rounded-xl shadow-2xl relative">
          <h1 className="text-white text-6xl text-center font-semibold absolute top-0 translate-y-[20%]">
            Add Job
          </h1>
          <img src={addJobBg} alt="" className="w-full mr-20" />
          <AiOutlinePlusCircle className="w-[70%] h-[70%] text-[#7DDDD9] absolute r-0 translate-x-[72%]"></AiOutlinePlusCircle>
        </div>

        <div className="w-[60%] px-10 py-12 border rounded-xl shadow-lg">
          <form
            className="flex flex-col gap-4 text-left pl-28"
            onSubmit={handlePostJob}
          >
            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                type="email"
                id="in4"
                name="email"
                placeholder="Your Email"
                defaultValue={user?.email}
                readOnly
                required
                className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                <MdTitle className="text-2xl text-white"></MdTitle>
              </div>
              <input
                type="text"
                id="in4"
                name="jobTitle"
                placeholder="Job title"
                required
                className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                <i className="fa-regular fa-calendar-days text-xl text-white"></i>
              </div>
              <input
                type="date"
                id="in4"
                name="deadline"
                placeholder="Deadline"
                required
                className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                <MdDescription className="text-2xl text-white"></MdDescription>
              </div>
              <input
                type="text"
                id="in4"
                name="description"
                placeholder="Description"
                required
                className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                <BiSolidCategory className="text-2xl text-white"></BiSolidCategory>
              </div>
              <select
                name="category"
                placeholder="Your Email"
                required
                className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
              >
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Graphic Design</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                  <MdPriceChange className="text-2xl text-white"></MdPriceChange>
                </div>
                <input
                  type="number"
                  id="in4"
                  name="minimumPrice"
                  placeholder="Minimum price"
                  step="0.01"
                  required
                  className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                />
              </div>

              <div className="relative">
                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                  <MdPriceChange className="text-2xl text-white"></MdPriceChange>
                </div>
                <input
                  type="number"
                  id="in4"
                  name="maximumPrice"
                  placeholder="Maximum price"
                  step="0.01"
                  required
                  className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                />
              </div>
            </div>

            <input
              type="submit"
              value="Add Job"
              className="input w-full bg-[#ff5c11dc] text-white font-semibold rounded-full"
            />
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddJobs;
