import { useQuery } from "@tanstack/react-query";
import { getUsersBidRequests } from "../api/bidAPIs";

const useUsersBidRequests = (email) => {
  const {
    isLoading: loadingUsersBidRequests,
    data: usersBidRequests,
    refetch: refetchUsersBidRequests,
  } = useQuery({
    queryKey: ["getUsersBidRequests"],
    queryFn: () => getUsersBidRequests(email),
  });

  return [loadingUsersBidRequests, usersBidRequests, refetchUsersBidRequests];
};

export default useUsersBidRequests;
