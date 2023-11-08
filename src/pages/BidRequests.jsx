import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import Title from "../reusableComponents/Title";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const BidRequests = () => {
  const title = "Bid Requests";
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);

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

  const url = `http://localhost:5000/bid-requests?email=${user?.email}`;

  useEffect(() => {
    axios.get(url).then((res) => setBids(res.data));
  }, [url]);

  const handleAcceptOrReject = (bidId, stat) => {
    fetch(`http://localhost:5000/bid-requests/${bidId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: stat }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Updated successfully!", toastCharacteristics);
          const remaining = bids.filter((bid) => bid._id !== bidId);
          const updated = bids.find((bid) => bid._id === bidId);
          updated.status = stat;
          const newlist = [updated, ...remaining];
          setBids(newlist);
        } else {
          toast.error("Something went wrong!", toastCharacteristics);
        }
      });
  };

  if (bids.length > 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <div className="w-full flex flex-col justify-center items-center p-10 mt-16">
          <div className="mb-6">
            <Title title={title}></Title>
          </div>

          <div className="w-[100%] overflow-y-auto h-[400px] rounded-lg">
            <table className="table table-zebra rounded-lg text-base text-center">
              {/* head */}
              <thead className="bg-[#323484] text-base text-white font-normal text-center">
                <tr>
                  <th>Job title</th>
                  <th>Bidder's Email</th>
                  <th>Offered Deadline</th>
                  <th>Offered Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row  */}

                {bids.map((bid) => (
                  <tr key={bid._id}>
                    <th className="text-[#ff5c11dc]">{bid.jobTitle}</th>
                    <td>{bid.bidderEmail}</td>
                    <td>{bid.biddingDeadline}</td>
                    <td>{bid.biddingAmount}</td>
                    <td>{bid.status}</td>
                    <td className="flex gap-3">
                      {bid.status === "Pending" ? (
                        <div>
                          <button
                            className="btn bg-[#7DDDD9] text-white text-base normal-case"
                            onClick={() =>
                              handleAcceptOrReject(bid._id, "In progress")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn bg-red-500 text-white text-base normal-case"
                            onClick={() =>
                              handleAcceptOrReject(bid._id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : bid.status === "In progress" ? (
                        <div className="w-[150px]">
                          <ProgressBar
                            percent={50}
                            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                          />
                        </div>
                      ) : bid.status === "Complete" ? (
                        <div className="w-[150px]">
                          <ProgressBar
                            percent={100}
                            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                          />
                        </div>
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
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <div className="w-full h-screen flex flex-col justify-center items-center p-10 mt-16">
          <h1 className="text-6xl font-semibold">No Bids Found</h1>
        </div>
      </div>
    );
  }
};

export default BidRequests;
