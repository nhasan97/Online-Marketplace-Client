import Title from "../reusableComponents/Title";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import useUsersBids from "../hooks/useUsersBids";
import Loading from "../reusableComponents/Loading";
import Nodata from "../reusableComponents/Nodata";
import usePerformMutation from "../hooks/usePerformMutation";
import { updateParticularBid } from "../api/bidAPIs";

const MyBids = () => {
  const title = "My bids";

  const { user, loading } = useAuth();

  const [loadingUsersBids, usersBids, refetchUsersBids] = useUsersBids(
    user?.email
  );

  //creating mutation for updating job status
  const mutation = usePerformMutation(
    "updateParticularBid",
    updateParticularBid,
    ""
  );

  //updating job status in db
  const handleComplete = (bidId, stat) => {
    const updatedJobStatus = { status: stat };
    mutation.mutate({ bidId, updatedJobStatus });
    refetchUsersBids();
  };

  if (loading || loadingUsersBids) {
    return <Loading></Loading>;
  }

  if (usersBids.length > 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <Helmet>
          <title>Work Line | My Bids</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <div className="w-full flex flex-col justify-center items-center p-10 mt-16">
          <div className="mb-6">
            <Title title={title}></Title>
          </div>

          <div className="w-[100%] overflow-y-auto h-[400px] rounded-lg">
            <table className=" table table-zebra rounded-lg text-base text-center">
              {/* head */}
              <thead className="bg-[#7DDDD9] text-base text-white font-normal text-center">
                <tr>
                  <th>Job title</th>
                  <th>Buyer's Email</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row  */}

                {usersBids.map((bid) => (
                  <tr key={bid._id}>
                    <th className="text-[#ff5c11dc]">{bid.jobTitle}</th>
                    <td>{bid.buyerEmail}</td>
                    <td>{bid.deadline}</td>
                    <td>{bid.status}</td>
                    <td>
                      {bid.status === "In progress" ? (
                        <button
                          className="btn bg-[#323484] text-white text-base normal-case"
                          onClick={() => handleComplete(bid._id, "Complete")}
                        >
                          Complete
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <Nodata text={"No Bids Found"}></Nodata>;
  }
};

export default MyBids;
