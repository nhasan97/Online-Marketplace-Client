import PostedJobCard from "./PostedJobCard";
import Swal from "sweetalert2";
import Title from "../../reusableComponents/Title";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useUsersPostedJobs from "../../hooks/useUsersPostedJobs";
import Loading from "../../reusableComponents/Loading";

const MyPostedJobs = () => {
  const { user, loading } = useAuth();

  const [loadingUsersPostedJobs, usersPostedJobs, refetchUsersPostedJobs] =
    useUsersPostedJobs(user?.email);

  const handlePostedJobDelete = (id) => {
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
        // axios
        //   .delete(
        //     `https://b8-a11-online-marketplace-server.vercel.app/posted-jobs/${id}`
        //   )
        //   .then((res) => {
        //     if (res.data.deletedCount) {
        //       const newList = myPostedJobs.filter((job) => job._id !== id);
        //       setMyPostedJobs(newList);
        //       Swal.fire({
        //         title: "Deleted!",
        //         text: "Your file has been deleted.",
        //         icon: "success",
        //       });
        //     } else {
        //       Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Something went wrong!",
        //       });
        //     }
        //   });
      }
    });
  };

  const title = "My Posted Jobs";

  if (loading || loadingUsersPostedJobs) {
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
                handlePostedJobDelete={handlePostedJobDelete}
              ></PostedJobCard>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <div className="w-full h-screen flex flex-col justify-center items-center p-10 mt-16">
          <h1 className="text-6xl font-semibold">No Posted Jobs Found</h1>
        </div>
      </div>
    );
  }
};

export default MyPostedJobs;
