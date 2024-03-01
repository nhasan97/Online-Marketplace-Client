import {
  showToastOnError,
  showToastOnSuccess,
} from "../utilities/displayToast";
import axiosPublic from "./axiosPublic";
import axiosSecure from "./axiosSecure";

export const getUsersBids = async (email) => {
  const response = await axiosSecure.get(`/bids?email=${email}`);
  return response.data;
};

export const getUsersBidRequests = async (email) => {
  const response = await axiosSecure.get(`/bid-requests?email=${email}`);
  return response.data;
};

export const saveBidInDB = async (data) => {
  const response = await axiosPublic.post("/bids", data);

  if (response.data.insertedId) {
    showToastOnSuccess("Submitted successfully!");
  } else {
    showToastOnError("Something went wrong!");
  }

  return response.data;
};

export const updateParticularBid = async (obj) => {
  const response = await axiosSecure.patch(
    `/bid-requests/${obj.bidId}`,
    obj.updatedJobStatus
  );

  if (response.data.modifiedCount) {
    showToastOnSuccess("Updated successfully!");
  } else {
    showToastOnError("Something went wrong!");
  }

  return response.data;
};
