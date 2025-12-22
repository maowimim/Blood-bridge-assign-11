import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../hook/useAxios';

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [results, setResults] = useState([]);

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

    axiosInstance
      .get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
      .then(res => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
  <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-slate-900 to-purple-900 min-h-screen">
  <h2 className="text-3xl font-bold text-center mb-8 text-purple-300 tracking-wide">
    Search Blood Requests
  </h2>

  {/* Search Form */}
  <form
    onSubmit={handleSearch}
    className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-800/80 backdrop-blur p-6 rounded-2xl shadow-xl border border-purple-700"
  >
    {/* Blood Group */}
    <select
      name="blood"
      required
      className="select w-full bg-gray-900 text-purple-200 border border-purple-600 focus:border-purple-400 focus:outline-none"
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

    {/* District */}
    <select
      name="district"
      required
      className="select w-full bg-gray-900 text-purple-200 border border-purple-600 focus:border-purple-400 focus:outline-none"
    >
      <option value="">Select District</option>
      {districts.map(d => (
        <option key={d.id} value={d.name}>
          {d.name}
        </option>
      ))}
    </select>

    {/* Upazila */}
    <select
      name="upazila"
      required
      className="select w-full bg-gray-900 text-purple-200 border border-purple-600 focus:border-purple-400 focus:outline-none"
    >
      <option value="">Select Upazila</option>
      {upazilas.map(u => (
        <option key={u.id} value={u.name}>
          {u.name}
        </option>
      ))}
    </select>

    {/* Search Button */}
    <button
      type="submit"
      className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
    >
      Search
    </button>
  </form>

  {/* Results Section */}
  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
    {results.length === 0 ? (
      <p className="text-center col-span-full text-gray-400 italic">
        No requests found
      </p>
    ) : (
      results.map((item, index) => (
        <div
          key={index}
          className="card bg-gray-800/90 border border-purple-700 rounded-xl shadow-xl p-5 text-gray-200 hover:scale-[1.02] transition-transform duration-300"
        >
          <h3 className="font-semibold text-xl text-purple-300 mb-2">
            Blood Group: {item.bloodGroup}
          </h3>
          <p className="text-sm">District: <span className="text-purple-200">{item.district}</span></p>
          <p className="text-sm">Upazila: <span className="text-purple-200">{item.upazila}</span></p>
          <p className="text-sm">Hospital: <span className="text-purple-200">{item.hospital}</span></p>
          <p className="text-xs text-gray-400 mt-2">
            Date: {item.donationDate}
          </p>
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default SearchRequest;
