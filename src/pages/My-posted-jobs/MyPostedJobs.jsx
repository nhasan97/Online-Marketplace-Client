import PostedJobCard from "./PostedJobCard";
import Swal from "sweetalert2";
import Title from "../../reusableComponents/Title";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useUsersPostedJobs from "../../hooks/useUsersPostedJobs";
import Loading from "../../reusableComponents/Loading";
import Nodata from "../../reusableComponents/Nodata";
import useCategories from "../../hooks/useCategories";
import usePerformMutation from "../../hooks/usePerformMutation";
import { deletePostedJob, updatePostedJob } from "../../api/jobAPIs";
import dateComparer from "../../utilities/dateComparer";
import useCurrentDate from "../../hooks/useCurrentDate";
import { showToastOnError } from "../../utilities/displayToast";

const MyPostedJobs = () => {
  const { user, loading } = useAuth();

  const [loadingUsersPostedJobs, usersPostedJobs, refetchUsersPostedJobs] =
    useUsersPostedJobs(user?.email);

  //fetching categories from DB
  const [loadingCategories, fetchedCategories] = useCategories();

  const today = useCurrentDate();

  //creating mutation for deleting job
  const mutation1 = usePerformMutation("updatePostedJob", updatePostedJob, "");

  //updating posted job in db
  const handleUpdatePostedJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const _id = form.jobID.value || "Not Found";
    const email = form.email.value || "Not Found";
    const jobTitle = form.jobTitle.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";
    const description = form.description.value || "Not Found";
    const category = form.category.value || "Not Found";
    const minimumPrice = form.minimumPrice.value || "Not Found";
    const maximumPrice = form.maximumPrice.value || "Not Found";

    const dateValidity = dateComparer(today, deadline);

    if (dateValidity === "invalid") {
      showToastOnError("Please enter a valid date!");
    } else if (maximumPrice - minimumPrice <= 0) {
      showToastOnError("Please enter a valid price range!");
    } else {
      const updatedJobInfo = {
        email,
        jobTitle,
        deadline,
        description,
        category,
        minimumPrice,
        maximumPrice,
      };
      mutation1.mutate({ _id, updatedJobInfo });
      refetchUsersPostedJobs();
      form.reset();
    }
  };

  //creating mutation for deleting job
  const mutation2 = usePerformMutation("deletePostedJob", deletePostedJob, "");

  //deleting posted job from db
  const handlePostedJobDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2DD4BF",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation2.mutate({ _id });
        refetchUsersPostedJobs();
      }
    });
  };

  const title = "My Posted Jobs";

  if (loading || loadingUsersPostedJobs || loadingCategories) {
    return <Loading></Loading>;
  }

  if (usersPostedJobs.length > 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <Helmet>
          <title>Work Line | My Posted Jobs</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <div className="w-full min-h-screen flex flex-col justify-center items-center mt-24">
          <Title title={title}></Title>

          <div className="grid grid-cols-3 gap-6 py-10">
            {usersPostedJobs.map((job) => (
              <PostedJobCard
                key={job._id}
                job={job}
                categories={fetchedCategories}
                handleUpdatePostedJob={handleUpdatePostedJob}
                handlePostedJobDelete={handlePostedJobDelete}
              ></PostedJobCard>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Nodata text={"No Posted Jobs Found"}></Nodata>;
  }
};

export default MyPostedJobs;
