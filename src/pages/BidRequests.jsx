import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import Title from "../reusableComponents/Title";

const BidRequests = () => {
  const title = "Bid Requests";
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bid-requests?email=${user?.email}`)
      .then((res) => setBids(res.data));
  }, []);

  if (bids.length > 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-20">
        <div className="w-full flex flex-col justify-center items-center p-10 mt-16">
          <div className="mb-6">
            <Title title={title}></Title>
          </div>

          <div className="w-[90%] overflow-y-auto h-[400px] rounded-lg">
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
                      <button className="btn bg-[#7DDDD9] text-white text-base normal-case">
                        Accept
                      </button>
                      <button className="btn bg-red-500 text-white text-base normal-case">
                        Reject
                      </button>
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
