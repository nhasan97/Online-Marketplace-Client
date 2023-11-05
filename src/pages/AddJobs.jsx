import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { MdTitle, MdDescription, MdPriceChange } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddJobs = () => {
  const { user } = useContext(AuthContext);

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

    const Email = form.email.value;
    const JobTitle = form.jobTitle.value;
    const Deadline = form.deadline.value;
    const Description = form.description.value;
    const Category = form.category.value;
    const MinimumPrice = form.minimumPrice.value;
    const MaximumPrice = form.maximumPrice.value;

    const jobInfo = {
      Email,
      JobTitle,
      Deadline,
      Description,
      Category,
      MinimumPrice,
      MaximumPrice,
    };

    axios.post("http://localhost:5000/posted-jobs", jobInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Inserted successfully!", toastCharacteristics);
        form.reset();
      } else {
        toast.error("Something went wrong!", toastCharacteristics);
      }
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center pt-20">
      <div className="w-1/2 border rounded-lg px-10">
        <form
          className="flex flex-col gap-4 text-left"
          onSubmit={handlePostJob}
        >
          {/* <h1 className="text-[#444] text-[40px] font-semibold text-center">
            Sign UP
          </h1> */}

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
            className="input w-full bg-[#ff5c11dc] text-white rounded-full"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddJobs;
