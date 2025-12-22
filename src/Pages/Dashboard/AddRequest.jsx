import React, { use, useEffect, useState } from 'react';

import axios from 'axios';


import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../hook/useAxios';


const AddRequest = () => {
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const { user } = use(AuthContext)
    const axiosInstance = useAxios()
  
    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas))

        axios.get('/district.json')
            .then(res => (setDistricts(res.data.districts)))
    }, [])

    const handleSubmit =(e)=>{
        e.preventDefault()
        const form = e.target;

    const requestData = {
        requesterName: user?.displayName,
        requesterEmail: user?.email,

        recipientName: form.recipientName.value,
        bloodGroup: form.bloodGroup.value,

        district: form.district.value,
        upazila: form.upazila.value,

        hospital: form.hospital.value,
        address: form.address.value,

        donationDate: form.donationDate.value,
        donationTime: form.donationTime.value,

        message: form.message.value,

        status: "pending"
        
    };
    console.log(requestData)
    axiosInstance.post('/requests',requestData)
     .then(res=>{
        console.log(res.data)
     })
    
}
    return (
         <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-slate-900 to-purple-900 rounded-2xl shadow-2xl animate-fade-in">
  <h2 className="text-2xl font-semibold mb-8 text-center text-purple-200 tracking-wide">
    Blood Donation Request
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Requester Info */}
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label text-gray-300">Requester Name</label>
        <input
          type="text"
          value={user?.displayName || ''}
          readOnly
          className="input w-full bg-gray-800 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
        />
      </div>

      <div>
        <label className="label text-gray-300">Requester Email</label>
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          className="input w-full bg-gray-800 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
        />
      </div>
    </div>

    {/* Recipient Info */}
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label text-gray-300">Recipient Name</label>
        <input
          name="recipientName"
          type="text"
          placeholder="Recipient full name"
          className="input w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl transition-all duration-300 hover:scale-[1.02]"
          required
        />
      </div>

      <div>
        <label className="label text-gray-300">Blood Group</label>
        <select
          name="bloodGroup"
          className="select w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
          required
        >
          <option value="">Select blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
    </div>

    {/* Location */}
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label text-gray-300">Recipient District</label>
        <select
          name="district"
          className="select w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
          required
        >
          <option value="">Select your district</option>
          {districts.map(d => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label text-gray-300">Recipient Upazila</label>
        <select
          name="upazila"
          className="select w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
          required
        >
          <option value="">Select your upazila</option>
          {upazilas.map(u => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Hospital & Address */}
    <div>
      <label className="label text-gray-300">Hospital Name</label>
      <input
        name="hospital"
        type="text"
        placeholder="Dhaka Medical College Hospital"
        className="input w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
        required
      />
    </div>

    <div>
      <label className="label text-gray-300">Full Address</label>
      <input
        name="address"
        type="text"
        placeholder="Zahir Raihan Rd, Dhaka"
        className="input w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
        required
      />
    </div>

    {/* Date & Time */}
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label text-gray-300">Donation Date</label>
        <input
          name="donationDate"
          type="date"
          className="input w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
          required
        />
      </div>

      <div>
        <label className="label text-gray-300">Donation Time</label>
        <input
          name="donationTime"
          type="time"
          className="input w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl"
          required
        />
      </div>
    </div>

    {/* Message */}
    <div>
      <label className="label text-gray-300">Request Message</label>
      <textarea
        name="message"
        rows="4"
        placeholder="Explain why blood is needed..."
        className="textarea w-full bg-gray-900 text-purple-200 border border-purple-700 focus:ring-2 focus:ring-purple-500 rounded-xl transition-all duration-300 hover:scale-[1.02]"
        required
      ></textarea>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="btn w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      Request Blood
    </button>
  </form>
</div>

    );
};

export default AddRequest;