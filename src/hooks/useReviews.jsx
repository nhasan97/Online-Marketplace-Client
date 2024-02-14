import { useQuery } from "@tanstack/react-query";
import { getReviewsFromDB } from "../api/reviewsAPIs";

const useReviews = () => {
  const {
    isLoading: loadingReviews,
    data: fetchedReviews,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["getReviews"],
    queryFn: getReviewsFromDB,
  });

  return [loadingReviews, fetchedReviews, refetchReviews];
};

export default useReviews;
