import { useQuery } from "@tanstack/react-query";
import { getUsersPostedJobs } from "../api/jobAPIs";

const useUsersPostedJobs = (email) => {
  const {
    isLoading: loadingUsersPostedJobs,
    data: usersPostedJobs,
    refetch: refetchUsersPostedJobs,
  } = useQuery({
    queryKey: ["getUsersPostedJobs"],
    queryFn: () => getUsersPostedJobs(email),
  });

  return [loadingUsersPostedJobs, usersPostedJobs, refetchUsersPostedJobs];
};

export default useUsersPostedJobs;
