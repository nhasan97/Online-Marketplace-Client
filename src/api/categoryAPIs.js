import axiosPublic from "./axiosPublic";

export const getCategoriesFromDB = async () => {
  const response = await axiosPublic.get("/categories");
  return response.data;
};
