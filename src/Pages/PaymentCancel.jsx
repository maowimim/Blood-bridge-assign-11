import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        
       
        <div className="flex justify-center mb-4">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>

       
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

       
        <p className="text-gray-600 mb-6">
          Your payment was not completed.  
          No money has been charged.
        </p>

      
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">
            You can try again anytime or return to the homepage.
          </p>
        </div>

       
        <div className="flex flex-col gap-3">
          <Link
            to="/donate"
            className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="w-full py-2 rounded-lg border border-red-600 text-red-600 font-semibold hover:bg-red-50 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
