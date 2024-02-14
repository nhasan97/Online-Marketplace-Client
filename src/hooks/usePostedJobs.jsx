import { useQuery } from "@tanstack/react-query";
import { getPostedJobsFromDB } from "../api/jobAPIs";

const usePostedJobs = () => {
  const {
    isLoading: loadingPostedJobs,
    data: fetchedPostedJobs,
    refetch: refetchPostedJobs,
  } = useQuery({
    queryKey: ["getPostedJobs"],
    queryFn: getPostedJobsFromDB,
  });

  let filteredWebDevelopmentJobs = [];
  let filteredDigitalMarketingJobs = [];
  let filteredGraphicDesignJobs = [];

  if (!loadingPostedJobs) {
    filteredWebDevelopmentJobs = fetchedPostedJobs.filter(
      (job) => job.category === "Web Development"
    );
    filteredDigitalMarketingJobs = fetchedPostedJobs.filter(
      (job) => job.category === "Digital Marketing"
    );
    filteredGraphicDesignJobs = fetchedPostedJobs.filter(
      (job) => job.category === "Graphic Design"
    );
  }

  return [
    loadingPostedJobs,
    fetchedPostedJobs,
    filteredWebDevelopmentJobs,
    filteredDigitalMarketingJobs,
    filteredGraphicDesignJobs,
    refetchPostedJobs,
  ];
};

export default usePostedJobs;
