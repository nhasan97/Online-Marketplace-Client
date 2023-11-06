import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";

const PostedJobCard = ({ job }) => {
  const {
    jobTitle,
    deadline,
    description,
    category,
    minimumPrice,
    maximumPrice,
  } = job;
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
          <button className="btn btn-circle bg-[#7DDDD9] text-white hover:text-[#7DDDD9]">
            <LiaEditSolid className="text-2xl"></LiaEditSolid>
          </button>
          <button className="btn btn-circle bg-red-500 text-white hover:text-red-500">
            <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
          </button>
        </div>
      </div>
    </div>
  );
};

PostedJobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default PostedJobCard;
