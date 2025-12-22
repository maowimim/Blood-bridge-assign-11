import React, { useContext, useEffect, useState } from "react";



import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hook/useAxios";


const AllRequest = () => {
  const [allRequests, setAllRequests] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosInstance.get("/all-requests").then((res) => {
    
      const pendingRequests = res.data.filter(
        (req) => req.status === "pending"
      );
      setAllRequests(pendingRequests);
    });
  }, [axiosInstance]);

  const handleView = (id) => {
    if (!user) {
      navigate("/login", { state: { from: `/request/${id}` } });
    } else {
      navigate(`/request/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Pending Blood Donation Requests
        </h2>

        {allRequests.length === 0 && (
          <p className="text-center text-gray-500">
            No pending donation requests found.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allRequests.map((request) => (
            <div
              key={request._id}
              className="card bg-white shadow-md border border-red-100"
            >
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-red-600">
                    {request.bloodGroup}
                  </h3>
                  <span className="badge badge-warning badge-outline">
                    Pending
                  </span>
                </div>

                <p>
                  <span className="font-semibold">Recipient:</span>{" "}
                  {request.recipientName}
                </p>

               
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {request.upazila}, {request.district}
                </p>

               
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {request.donationDate}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {request.donationTime}
                </p>

              
                <div className="card-actions mt-4">
                  <button
                    onClick={() => handleView(request._id)}
                    className="btn btn-outline btn-error w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRequest;