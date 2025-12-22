import React, { use } from 'react';

import { AuthContext } from '../Provider/AuthProvider';
import useAxios from '../hook/useAxios';

const Donate = () => {
    const axiosInstance = useAxios()
    const {user}=use(AuthContext)
   
    const handleCheckOut = e=>{
        e.preventDefault()
        const donateAmount = e.target.donateAmount.value
        const donorEmail = user?.email
        const donorName = user?.displayName
        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }
  
        axiosInstance.post('/create-payment-checkout',formData)
         .then(res=>{
            console.log(res.data)
            window.location.href = res.data.url
         })
    }
    return (
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-purple-900">
  <form
    onSubmit={handleCheckOut}
    className="flex justify-center items-center min-h-screen gap-6 animate-fade-in"
  >
    <input
      name="donateAmount"
      type="text"
      placeholder="Type here"
      className="input bg-gray-800 text-purple-200 placeholder-gray-400 border border-purple-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-xl w-64 transition-all duration-300 hover:scale-[1.03]"
    />

    <button
      type="submit"
      className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      Donate
    </button>
  </form>
</div>

    );
};

export default Donate;