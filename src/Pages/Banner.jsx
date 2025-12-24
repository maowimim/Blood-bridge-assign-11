import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // kept as-is (not removed)

  // Join as Donor → Registration Page
  const handleJoin = () => {
    navigate("/register");
  };

  // Search Donors → Search Page (NO role check)
  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <section className="relative bg-gradient-to-r from-red-600 to-red-800 py-28 px-4">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Save Lives <br />
          <span className="text-yellow-300">Donate Blood Today</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-red-100 mb-10">
          Join our trusted donor network or quickly find blood donors near you.
          Every drop counts and every donor matters.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={handleJoin}
            className="btn btn-lg bg-white text-red-700 hover:bg-gray-100 px-10"
          >
            Join as a Donor
          </button>

          <button
            onClick={handleSearch}
            className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-red-700 px-10"
          >
            Search Donors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
