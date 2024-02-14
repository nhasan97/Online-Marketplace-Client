import axiosSecure from "./axiosSecure";

export const getUsersBids = async (email) => {
  const response = await axiosSecure.get(`/bids?email=${email}`);
  return response.data;
};
