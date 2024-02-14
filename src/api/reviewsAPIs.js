import axiosPublic from "./axiosPublic";

export const getReviewsFromDB = async () => {
  const response = await axiosPublic.get("/reviews");
  return response.data;
};
