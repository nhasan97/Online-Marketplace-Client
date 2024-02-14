import { useQuery } from "@tanstack/react-query";
import { getCategoriesFromDB } from "../api/categoryAPIs";

const useCategories = () => {
  const {
    isLoading: loadingCategories,
    data: fetchedCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategoriesFromDB,
  });

  return [loadingCategories, fetchedCategories, refetchCategories];
};

export default useCategories;
