import {
  showToastOnError,
  showToastOnSuccess,
} from "../utilities/displayToast";
import axiosPublic from "./axiosPublic";
import axiosSecure from "./axiosSecure";

export const getPostedJobsFromDB = async () => {
  const response = await axiosPublic.get("/posted-jobs");
  return response.data;
};

export const getUsersPostedJobs = async (email) => {
  const response = await axiosSecure.get(`/my-posted-jobs?email=${email}`);
  return response.data;
};

export const saveJobInDB = async (data) => {
  const response = await axiosPublic.post("/posted-jobs", data);

  if (response.data.insertedId) {
    showToastOnSuccess("Inserted successfully!");
  } else {
    showToastOnError("Something went wrong!");
  }

  return response.data;
};

export const updatePostedJob = async (obj) => {
  const response = await axiosPublic.patch(
    `/posted-jobs/${obj._id}`,
    obj.updatedJobInfo
  );

  if (response.data.modifiedCount) {
    showToastOnSuccess("Updated successfully!");
  } else {
    showToastOnError("Something went wrong!");
  }

  return response.data;
};

export const deletePostedJob = async (_id) => {
  const response = await axiosPublic.delete(`/posted-jobs/${_id._id}`);

  if (response.data.deletedCount) {
    showToastOnSuccess("Deleted!");
  } else {
    showToastOnError("Something went wrong!");
  }
  return response.data;
};
