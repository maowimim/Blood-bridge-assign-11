import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        
       
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>

       
        <p className="text-gray-600 mb-6">
          Thank you for your generous donation.  
          Your support helps save lives ❤️
        </p>

        

       
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="w-full py-2 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
