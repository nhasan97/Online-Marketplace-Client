import { useNavigate, useParams } from "react-router-dom";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import { Helmet } from "react-helmet-async";
import Title from "../../reusableComponents/Title";
import { MdPriceChange } from "react-icons/md";
import bidImage from "../../assets/freelancer_dribbble.png";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getSingleJobData } from "../../api/jobAPIs";
import Loading from "../../reusableComponents/Loading";
import Nodata from "../../reusableComponents/Nodata";
import usePerformMutation from "../../hooks/usePerformMutation";
import { saveBidInDB } from "../../api/bidAPIs";
import { showToastOnError } from "../../utilities/displayToast";
import JobDetails from "./JobDetails";

const JobDetailsAndBidPlacement = () => {
  const _id = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = useCurrentDate();

  //fetching the data of the particular Job
  const { isLoading: loadingJob, data: loadedJob } = useQuery({
    queryKey: ["getSingleJobData"],
    queryFn: () => getSingleJobData(_id),
  });

  //creating mutation for bid submission
  const mutation = usePerformMutation("saveBidInDB", saveBidInDB, "");

  //saving bid in db
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

    const dateValidity2 = dateComparer(today, biddingDeadline);
    const dateValidity3 = dateComparer(biddingDeadline, deadline);

    if (dateValidity2 === "invalid") {
      showToastOnError("Please enter a valid date!");
    } else if (dateValidity3 === "invalid") {
      showToastOnError(
        "Your bidding deadline is exceeding the buyer's deadline!"
      );
    } else {
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

      mutation.mutate(bidInfo);
      navigate("/my-bids");
    }
  };

  if (loadingJob) {
    return <Loading></Loading>;
  }

  if (loadedJob) {
    const dateValidity1 = dateComparer(today, loadedJob.deadline);

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
                <JobDetails
                  key={loadedJob._id}
                  loadedJob={loadedJob}
                ></JobDetails>

                <div>
                  <Title title={"Place Your Bid"}></Title>
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
  } else {
    return <Nodata text={"No Details Found"}></Nodata>;
  }
};

export default JobDetailsAndBidPlacement;
