import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../hook/useAxios';

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [results, setResults] = useState([]);

  
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get('/upazila.json')
      .then(res => setUpazilas(res.data.upazilas));

    axios.get('/district.json')
      .then(res => setDistricts(res.data.districts));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const bloodGroup = e.target.blood.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    // ✅ added
    setLoading(true);
    setSearched(false);
    setResults([]);

    axiosInstance
      .get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
      .then(res => {
        // ⏳ fake delay for UX
        setTimeout(() => {
          setResults(res.data);
          setLoading(false);
          setSearched(true);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setSearched(true);
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-rose-50 via-pink-100 to-red-100 min-h-screen animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8 text-rose-600 tracking-wide animate-slideDown">
        Search Blood Requests
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-rose-300 animate-scaleIn"
      >
        <select
          name="blood"
          required
          className="select w-full bg-rose-50 text-rose-700 border border-rose-300 focus:border-rose-500 focus:outline-none transition-all"
        >
          <option value="">Choose Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <select
          name="district"
          required
          className="select w-full bg-rose-50 text-rose-700 border border-rose-300 focus:border-rose-500 focus:outline-none transition-all"
        >
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>

        <select
          name="upazila"
          required
          className="select w-full bg-rose-50 text-rose-700 border border-rose-300 focus:border-rose-500 focus:outline-none transition-all"
        >
          <option value="">Select Upazila</option>
          {upazilas.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-70"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading && (
          <p className="text-center col-span-full text-rose-500 font-semibold animate-pulse">
            Searching donors, please wait...
          </p>
        )}

        {!loading && searched && results.length === 0 && (
          <p className="text-center col-span-full text-gray-500 italic animate-fadeIn">
            No donor found at this moment 
          </p>
        )}

        {!loading && results.map((item, index) => (
          <div
            key={index}
            className="card bg-white border border-rose-300 rounded-xl shadow-lg p-5 text-gray-700 hover:scale-[1.03] hover:shadow-rose-200 transition-all duration-300 animate-fadeUp"
          >
            <h3 className="font-semibold text-xl text-rose-600 mb-2">
              Blood Group: {item.bloodGroup}
            </h3>
            <p className="text-sm">District: <span className="text-rose-500">{item.district}</span></p>
            <p className="text-sm">Upazila: <span className="text-rose-500">{item.upazila}</span></p>
            <p className="text-sm">Hospital: <span className="text-rose-500">{item.hospital}</span></p>
            <p className="text-xs text-gray-400 mt-2">
              Date: {item.donationDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRequest;
