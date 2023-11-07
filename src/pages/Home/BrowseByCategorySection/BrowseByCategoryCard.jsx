import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const BrowseByCategoryCard = ({ job }) => {
  const { user } = useContext(AuthContext);
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
  return (
    <div className="card bg-base-100 transition duration-150 ease-in-out border hover:shadow-lg ">
      <div className="card-body p-8 space-y-2">
        <h2 className="card-title text-[#323484] text-3xl font-bold rounded-full">
          {jobTitle}
        </h2>

        <p className="text-lg text-[#72ccc6] font-medium">
          Deadline | {deadline}
        </p>

        <div className="flex gap-2">
          <p className="rounded-lg text-base text-[#323384b7] font-medium">
            <span className="text-xl">
              ${minimumPrice} - ${maximumPrice}
            </span>
          </p>
          {/* <p className="p-3 bg-[#323384b7] rounded-lg text-base text-[#e8ebfa] font-medium">
           <span className="text-xl"></span>
          </p> */}
        </div>

        <p className="text-[#6f6f77] text-base">{description}</p>

        <div className="flex justify-end items-center gap-2">
          {user?.email === email ? (
            <button
              disabled
              className="btn w-full"
              onClick={() => document.getElementById(_id).showModal()}
            >
              Bid Now
            </button>
          ) : (
            <button
              className="btn w-full bg-[#ff5c11dc] text-white hover:text-[#7DDDD9]"
              onClick={() => document.getElementById(_id).showModal()}
            >
              Bid Now
            </button>
          )}

          {/* <button
            className="btn btn-circle bg-[#7DDDD9] text-white hover:text-[#7DDDD9]"
            onClick={() => document.getElementById(_id).showModal()}
          >
            <LiaEditSolid className="text-2xl"></LiaEditSolid>
          </button>
          <button className="btn btn-circle bg-red-500 text-white hover:text-red-500">
            <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
          </button> */}
        </div>
      </div>
    </div>
  );
};

BrowseByCategoryCard.propTypes = {
  job: PropTypes.object.isRequired,
  handlePostedJobDelete: PropTypes.func.isRequired,
};

export default BrowseByCategoryCard;
