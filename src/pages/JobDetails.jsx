import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

import Title from "../reusableComponents/Title";
import bidImage from "../assets/freelancer_dribbble.png";
import { MdTitle, MdDescription, MdPriceChange } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCurrentDate from "../customHooks/UseCurrentDate";
import dateComparer from "../utilities/dateComparer";
import { Helmet } from "react-helmet-async";

const JobDetails = () => {
  const title1 = "Job Details";
  const title2 = "Place Your Bid";
  const loadedJob = useLoaderData();
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

  const today = useCurrentDate();
  const dateValidity1 = dateComparer(today, loadedJob.deadline);

  const handleBidOnProject = (e) => {
    e.preventDefault();

    const form = e.target;

    const jobTitle = form.jobTitle.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";
    const minimumPrice = form.minimumPrice.value || "Not Found";
    const maximumPrice = form.maximumPrice.value || "Not Found";
    const description = form.description.value || "Not Found";
    const biddingAmount = form.biddingAmount.value || "Not Found";
    const biddingDeadline = form.biddingDeadline.value || "Not Found";
    const bidderEmail = form.bidderEmail.value || "Not Found";
    const buyerEmail = form.buyerEmail.value || "Not Found";

    const bidInfo = {
      jobTitle,
      deadline,
      minimumPrice,
      maximumPrice,
      description,
      biddingAmount,
      biddingDeadline,
      bidderEmail,
      buyerEmail,
      status: "Pending",
    };

    const dateValidity2 = dateComparer(today, biddingDeadline);
    const dateValidity3 = dateComparer(biddingDeadline, deadline);

    if (dateValidity2 === "invalid") {
      toast.error("Please enter a valid date!", toastCharacteristics);
    } else if (dateValidity3 === "invalid") {
      toast.error(
        "Your bidding deadline is exceeding the buyer's deadline!",
        toastCharacteristics
      );
    } else {
      axios.post("http://localhost:5000/bids", bidInfo).then((res) => {
        if (res.data.insertedId) {
          toast.success("Inserted successfully!", toastCharacteristics);
          form.reset();
          navigate("/my-bids");
        } else {
          toast.error("Something went wrong!", toastCharacteristics);
        }
      });
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto px-20">
      <Helmet>
        <title>Work Line | Job Details</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="w-full min-h-screen flex justify-center items-center pb-10 mt-16">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="px-10 space-y-4" onSubmit={handleBidOnProject}>
              <div>
                <Title title={title1}></Title>
                <div className="py-10 space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="relative">
                      <div className="h-[50px] w-full flex flex-col justify-center items-center text-white absolute top-0 left-0 bg-[#7DDDD9] rounded-t-lg">
                        <MdTitle className="text-2xl"></MdTitle>
                        <p className="text-lg font-medium">Title</p>
                      </div>
                      <input
                        type="text"
                        id="in4"
                        name="jobTitle"
                        placeholder="Job title"
                        defaultValue={loadedJob.jobTitle}
                        required
                        readOnly
                        className="input bg-[#a1dada41] w-full h-[100px] pt-20 pb-8 text-center rounded-lg border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <div className="h-[50px] w-full flex flex-col justify-center items-center text-white absolute top-0 left-0 bg-[#7DDDD9] rounded-t-lg">
                        <i className="fa-regular fa-calendar-days text-xl"></i>
                        <p className="text-lg font-medium">Deadline</p>
                      </div>
                      <input
                        type="date"
                        id="in4"
                        name="deadline"
                        placeholder="Deadline"
                        defaultValue={loadedJob.deadline}
                        required
                        readOnly
                        className="input bg-[#a1dada41] w-full h-[100px] pt-20 pb-8 text-center rounded-lg border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <div className="h-[50px] w-full flex flex-col justify-center items-center text-white absolute top-0 left-0 bg-[#7DDDD9] rounded-t-lg">
                        <MdPriceChange className="text-2xl"></MdPriceChange>
                        <p className="text-lg font-medium">Min-price</p>
                      </div>
                      <input
                        type="number"
                        id="in4"
                        name="minimumPrice"
                        placeholder="Min-price"
                        defaultValue={loadedJob.minimumPrice}
                        step="0.01"
                        min="1"
                        required
                        readOnly
                        className="input bg-[#a1dada41] w-full h-[100px] pt-20 pb-8 text-center rounded-lg border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <div className="h-[50px] w-full flex flex-col justify-center items-center text-white absolute top-0 left-0 bg-[#7DDDD9] rounded-t-lg">
                        <MdPriceChange className="text-2xl"></MdPriceChange>
                        <p className="text-lg font-medium">Max-price</p>
                      </div>
                      <input
                        type="number"
                        id="in4"
                        name="maximumPrice"
                        placeholder="Max-price"
                        defaultValue={loadedJob.maximumPrice}
                        step="0.01"
                        min="1"
                        required
                        readOnly
                        className="input bg-[#a1dada41] w-full h-[100px] pt-20 pb-8 text-center rounded-lg border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="h-[50px] w-full flex flex-col justify-center items-center text-white absolute top-0 left-0 bg-[#7DDDD9] rounded-t-lg">
                      <MdDescription className="text-2xl text-white"></MdDescription>
                      <p className="text-lg font-medium">Description</p>
                    </div>
                    <input
                      type="text"
                      id="in4"
                      name="description"
                      placeholder="Description"
                      defaultValue={loadedJob.description}
                      required
                      readOnly
                      className="input bg-[#a1dada41] w-full h-[100px] pt-20 pb-8 text-center rounded-lg border focus:border-[#323384b7] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Title title={title2}></Title>
                <div className="flex gap-4 py-10">
                  <div className="w-[40%]">
                    <img src={bidImage} alt="" />
                  </div>
                  <div className="w-[60%] flex flex-col gap-4 py-10 text-left">
                    <div className="relative">
                      <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                        <MdPriceChange className="text-2xl text-white"></MdPriceChange>
                      </div>
                      <input
                        type="number"
                        id="in4"
                        name="biddingAmount"
                        placeholder="Price"
                        step="0.01"
                        min={loadedJob.minimumPrice}
                        max={loadedJob.maximumPrice}
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
                        name="biddingDeadline"
                        placeholder="Deadline"
                        required
                        className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                        <i className="fa-solid fa-envelope text-xl text-white"></i>
                      </div>
                      <input
                        type="email"
                        id="in4"
                        name="bidderEmail"
                        placeholder="Your Email"
                        defaultValue={user?.email}
                        readOnly
                        required
                        className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#323384b7] rounded-s-full">
                        <i className="fa-solid fa-envelope text-xl text-white"></i>
                      </div>
                      <input
                        type="email"
                        id="in4"
                        name="buyerEmail"
                        placeholder="Your Email"
                        defaultValue={loadedJob.email}
                        readOnly
                        required
                        className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                      />
                    </div>
                    {user?.email === loadedJob.email ||
                    dateValidity1 === "invalid" ? (
                      <button
                        disabled
                        className="btn w-full bg-[#ff5c11dc] text-white font-semibold rounded-full hover:text-[#ff5c11dc]"
                      >
                        Bid on the Project
                      </button>
                    ) : (
                      <input
                        type="submit"
                        value="Bid on the Project"
                        className="btn w-full bg-[#ff5c11dc] text-white font-semibold rounded-full hover:text-[#ff5c11dc]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
