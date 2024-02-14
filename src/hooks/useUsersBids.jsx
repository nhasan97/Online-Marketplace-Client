import { useQuery } from "@tanstack/react-query";
import { getUsersBids } from "../api/bidAPIs";

const useUsersBids = (email) => {
  const {
    isLoading: loadingUsersBids,
    data: usersBids,
    refetch: refetchUsersBids,
  } = useQuery({
    queryKey: ["getUsersBids"],
    queryFn: () => getUsersBids(email),
  });

  return [loadingUsersBids, usersBids, refetchUsersBids];
};

export default useUsersBids;
