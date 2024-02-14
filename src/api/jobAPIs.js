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
