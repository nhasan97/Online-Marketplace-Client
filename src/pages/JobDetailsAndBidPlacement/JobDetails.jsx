import Title from "../../reusableComponents/Title";
import { MdTitle, MdDescription, MdPriceChange } from "react-icons/md";
import PropTypes from "prop-types";

const JobDetails = ({ loadedJob }) => {
  const { jobTitle, deadline, minimumPrice, maximumPrice, description } =
    loadedJob;

  return (
    <div>
      <Title title={"Job Details"}></Title>
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
              defaultValue={jobTitle}
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
              defaultValue={deadline}
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
              defaultValue={minimumPrice}
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
              defaultValue={maximumPrice}
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
            defaultValue={description}
            required
            readOnly
            className="input bg-[#a1dada41] w-full h-[100px] pt-20 pb-8 text-center rounded-lg border focus:border-[#323384b7] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

JobDetails.propTypes = {
  loadedJob: PropTypes.object.isRequired,
};

export default JobDetails;
