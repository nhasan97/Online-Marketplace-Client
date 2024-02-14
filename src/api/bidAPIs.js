import axiosSecure from "./axiosSecure";

export const getUsersBids = async (email) => {
  const response = await axiosSecure.get(`/bids?email=${email}`);
  return response.data;
};

export const getUsersBidRequests = async (email) => {
  const response = await axiosSecure.get(`/bid-requests?email=${email}`);
  return response.data;
};
