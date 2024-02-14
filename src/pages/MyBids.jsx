import Title from "../reusableComponents/Title";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import useUsersBids from "../hooks/useUsersBids";
import Loading from "../reusableComponents/Loading";
import Nodata from "../reusableComponents/Nodata";

const MyBids = () => {
  const title = "My bids";

  const { user, loading } = useAuth();

  const [loadingUsersBids, usersBids, refetchUsersBids] = useUsersBids(
    user?.email
  );

  const toastCharacteristics = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleComplete = (bidId, stat) => {
    // fetch(
    //   `https://b8-a11-online-marketplace-server.vercel.app/bid-requests/${bidId}`,
    //   {
    //     method: "PATCH",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify({ status: stat }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.modifiedCount) {
    //       toast.success("Updated successfully!", toastCharacteristics);
    //       const remaining = bids.filter((bid) => bid._id !== bidId);
    //       const updated = bids.find((bid) => bid._id === bidId);
    //       updated.status = stat;
    //       const newlist = [updated, ...remaining];
    //       setBids(newlist);
    //     } else {
    //       toast.error("Something went wrong!", toastCharacteristics);
    //     }
    //   });
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
