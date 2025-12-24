import React, { useState, use } from 'react'; 
import useAxios from '../hook/useAxios';
import { AuthContext } from '../provider/AuthProvider';

const Donate = () => {
    const axiosInstance = useAxios()
    const {user}=use(AuthContext)

    const [loading, setLoading] = useState(false) 

    const handleCheckOut = async (e) => { 
        e.preventDefault()

        const donateAmount = e.target.donateAmount.value
        const donorEmail = user?.email
        const donorName = user?.displayName

        if(!donateAmount || isNaN(donateAmount) || donateAmount <= 0){ 
            alert('Please enter a valid amount')
            return
        }

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }

        try {
            setLoading(true) 
            const res = await axiosInstance.post('/create-payment-checkout', formData)
            console.log(res.data)
            window.location.href = res.data.url 
        } catch (err) {
            console.error(err)
            alert('Something went wrong! Please try again.') 
        } finally {
            setLoading(false) 
        }
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
      disabled={loading} 
    />

    <button
      type="submit"
      className={`btn bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-500 hover:to-rose-500 hover:scale-105 active:scale-95 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Donate'} 
    </button>
  </form>

 
  <p className="text-center mt-4 text-red-700 text-sm">
    You will be redirected to Stripe securely to complete your donation. <br/>
    Your bank information will never be stored on our server.
  </p>
</div>
    );
};

export default Donate;
