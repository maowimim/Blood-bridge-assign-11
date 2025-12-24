import React, { use } from 'react';

import useAxios from '../hook/useAxios';
import { AuthContext } from '../provider/AuthProvider';

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
<div className="bg-gradient-to-br from-rose-50 via-pink-100 to-red-100">
  <form
    onSubmit={handleCheckOut}
    className="flex justify-center items-center min-h-screen gap-6 animate-fade-in"
  >
    <input
      name="donateAmount"
      type="text"
      placeholder="Type here"
      className="input bg-rose-50 text-rose-700 placeholder-rose-400 border border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:outline-none rounded-xl w-64 transition-all duration-300 hover:scale-[1.03]"
    />

    <button
      type="submit"
      className="btn bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-500 hover:to-rose-500 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      Donate
    </button>
  </form>
</div>

    );
};

export default Donate;