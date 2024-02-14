import axiosPublic from "./axiosPublic";

export const getPostedJobsFromDB = async () => {
  const response = await axiosPublic.get("/posted-jobs");
  return response.data;
};
