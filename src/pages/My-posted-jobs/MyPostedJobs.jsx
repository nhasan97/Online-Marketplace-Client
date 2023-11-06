import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import PostedJobCard from "./PostedJobCard";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [myPostedJobs, setMyPostedJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-posted-jobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyPostedJobs(data);
      });
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center mt-16">
      <div className="grid grid-cols-3 gap-6 py-10">
        {myPostedJobs.map((job) => (
          <PostedJobCard key={job._id} job={job}></PostedJobCard>
        ))}
      </div>
    </div>
  );
};

export default MyPostedJobs;
