import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAxios from "../hook/useAxios";



const RequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/request/${id}`).then((res) => {
      setRequest(res.data);
      setLoading(false);
    });
  }, [axiosInstance, id]);

  const handleConfirmDonation = () => {
    axiosSecure
      .patch(`/request/${id}`, {
        status: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      })
      .then(() => {
        document.getElementById("donate_modal").close();
        navigate("/all-requests");
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          Donation Request Details
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Recipient Name:</strong> {request.recipientName}</p>
          <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
          <p><strong>District:</strong> {request.district}</p>
          <p><strong>Upazila:</strong> {request.upazila}</p>
          <p><strong>Hospital:</strong> {request.hospital}</p>
          <p><strong>Address:</strong> {request.address}</p>
          <p><strong>Date:</strong> {request.donationDate}</p>
          <p><strong>Time:</strong> {request.donationTime}</p>
          <p><strong>Requester Name:</strong> {request.requesterName}</p>
          <p><strong>Requester Email:</strong> {request.requesterEmail}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="badge badge-warning">
              {request.status}
            </span>
          </p>
        </div>

        {/* Message */}
        {request.message && (
          <div className="mt-4">
            <strong>Message:</strong>
            <p className="mt-1 text-gray-600">{request.message}</p>
          </div>
        )}

        {/* Donate Button */}
        {request.status === "pending" && (
          <div className="mt-6">
            <button
              onClick={() =>
                document.getElementById("donate_modal").showModal()
              }
              className="btn btn-error w-full"
            >
              Donate Blood
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <dialog id="donate_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600 mb-4">
            Confirm Donation
          </h3>

          <div className="space-y-3">
            <div>
              <label className="label">Donor Name</label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Donor Email</label>
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={handleConfirmDonation}
              className="btn btn-success"
            >
              Confirm Donation
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestDetails;