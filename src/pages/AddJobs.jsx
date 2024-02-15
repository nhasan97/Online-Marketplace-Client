import { useNavigate } from "react-router-dom";

import { MdTitle, MdDescription, MdPriceChange } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import addJobBg from "../assets/Screenshot_2023-11-06_194840-removebg-preview.png";

import dateComparer from "../utilities/dateComparer";
import { Helmet } from "react-helmet-async";
import useCurrentDate from "../hooks/useCurrentDate";
import { showToastOnError } from "../utilities/displayToast";
import useAuth from "../hooks/useAuth";
import useCategories from "../hooks/useCategories";
import Loading from "../reusableComponents/Loading";
import usePerformMutation from "../hooks/usePerformMutation";
import { saveJobInDB } from "../api/jobAPIs";

const AddJobs = () => {
  const { user, loading } = useAuth();
  const today = useCurrentDate();
  const navigate = useNavigate();

  //fetching categories from DB
  const [loadingCategories, fetchedCategories] = useCategories();

  //saving job in db
  const mutation = usePerformMutation("saveJobInDB", saveJobInDB, "");

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

    const dateValidity = dateComparer(today, deadline);

    if (dateValidity === "invalid") {
      showToastOnError("Oops...Please enter a valid date!");
    } else if (maximumPrice - minimumPrice <= 0) {
      showToastOnError("Oops...Please enter a valid price range!");
    } else {
      const jobInfo = {
        email,
        jobTitle,
        deadline,
        description,
        category,
        minimumPrice,
        maximumPrice,
      };
      mutation.mutate(jobInfo);
      form.reset();
      navigate("/my-posted-jobs");
    }
  };

  if (loading || loadingCategories) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <Helmet>
          <title>Work Line | Add Job</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
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
                  {fetchedCategories.map((category) => (
                    <option key={category._id}>{category.category}</option>
                  ))}
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
                    placeholder="Maximum price"
                    step="0.01"
                    min="1"
                    required
                    className="input bg-[#e8ebfa] w-full pl-16 rounded-full border focus:border-[#323384b7] focus:outline-none"
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Add Job"
                className="btn w-full bg-[#ff5c11dc] text-white hover:text-[#ff5c11dc] font-semibold rounded-full"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default AddJobs;
