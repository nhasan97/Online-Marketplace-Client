import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdTitle, MdDescription, MdPriceChange } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCurrentDate from "../../customHooks/UseCurrentDate";
import dateComparer from "../../utilities/dateComparer";

const PostedJobCard = ({ job, handlePostedJobDelete }) => {
  const {
    _id,
    email,
    jobTitle,
    deadline,
    description,
    category,
    minimumPrice,
    maximumPrice,
  } = job;

  //   const selectDefaultCategory = () => {
  //     if (category === "Web Development") {
  //       document.getElementById("option1").selected;
  //     } else if (category === "Digital Marketing") {
  //       document.getElementById("option2").selected;
  //     } else {
  //       document.getElementById("option3").selected;
  //     }
  //   };
  const navigate = useNavigate();
  const today = useCurrentDate();

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

  const handleUpdatePostedJob = (e) => {
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

    const dateValidity = dateComparer(today, deadline);

    if (dateValidity === "invalid") {
      toast.error("Please enter a valid date!", toastCharacteristics);
    } else if (maximumPrice - minimumPrice <= 0) {
      toast.error("Please enter a valid price range!", toastCharacteristics);
    } else {
      axios
        .patch(
          `https://b8-a11-online-marketplace-server.vercel.app/posted-jobs/${_id}`,
          jobInfo
        )
        .then((res) => {
          if (res.data.modifiedCount) {
            toast.success("Updated successfully!", toastCharacteristics);
            form.reset();
            navigate("/my-posted-jobs");
          } else {
            toast.error("Something went wrong!", toastCharacteristics);
          }
        });
    }
  };

  return (
    <div className="card bg-base-100 transition duration-150 ease-in-out border-2 hover:shadow-lg hover:shadow-[#2B3440] ">
      <div className="card-body p-8 space-y-4">
        <h2 className="card-title text-[#323484] text-3xl font-bold rounded-full">
          {jobTitle}
        </h2>

        <p className="badge p-3 text-[#ff5c11dc] font-semibold border border-[#ff5c11dc]">
          {category}
        </p>

        <p className="text-[#6f6f77] text-base">{description}</p>

        <p className="text-base text-[#323384e7] font-medium">
          Deadline | {deadline}
        </p>

        <div className="flex gap-2">
          <p className="p-3 bg-[#323384b7] rounded-lg text-base text-[#e8ebfa] font-medium">
            Min-Price | <span className="text-xl">${minimumPrice}</span>
          </p>
          <p className="p-3 bg-[#323384b7] rounded-lg text-base text-[#e8ebfa] font-medium">
            Max-Price | <span className="text-xl">${maximumPrice}</span>
          </p>
        </div>

        <div className="flex justify-end items-center gap-2">
          <button
            className="btn btn-circle bg-[#7DDDD9] text-white hover:text-[#7DDDD9]"
            onClick={() => document.getElementById(_id).showModal()}
          >
            <LiaEditSolid className="text-2xl"></LiaEditSolid>
          </button>
          <button
            className="btn btn-circle bg-red-500 text-white hover:text-red-500"
            onClick={() => {
              handlePostedJobDelete(_id);
            }}
          >
            <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
          </button>
        </div>
      </div>

      <dialog id={_id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="p-5">
            <form
              className="flex flex-col gap-4 text-left"
              onSubmit={handleUpdatePostedJob}
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
                  defaultValue={email}
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
                  defaultValue={jobTitle}
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
                  defaultValue={deadline}
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
                  defaultValue={description}
                  required
                  className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                />
              </div>

              <div className="relative">
                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                  <BiSolidCategory className="text-2xl text-white"></BiSolidCategory>
                </div>
                <input
                  type="text"
                  id="in4"
                  name="category"
                  //   placeholder="Description"
                  defaultValue={category}
                  required
                  className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                />
                {/* <select
                  name="category"
                  placeholder="Your Email"
                  required
                  className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                >
                  <option id="option1">Web Development</option>
                  <option id="option2">Digital Marketing</option>
                  <option id="option3">Graphic Design</option>
                </select> */}
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
                    placeholder="Min-price"
                    defaultValue={minimumPrice}
                    step="0.01"
                    min="1"
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
                    placeholder="Max-price"
                    defaultValue={maximumPrice}
                    step="0.01"
                    min="1"
                    required
                    className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Update"
                className="input w-full bg-[#7DDDD9] text-[#2B3440] font-semibold rounded-full"
              />
              <ToastContainer />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

PostedJobCard.propTypes = {
  job: PropTypes.object.isRequired,
  handlePostedJobDelete: PropTypes.func.isRequired,
};

export default PostedJobCard;
