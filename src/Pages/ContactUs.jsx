import React, { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Thank you! Your message has been successfully sent.");
      e.target.reset();
    }, 1500);
  };

  return (
   <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-red-50 to-rose-100 px-4 py-20">
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-red-700 text-center mb-4">
      Reach Out to Us
    </h2>
    <p className="text-center text-red-600 mb-14 text-lg md:text-xl max-w-3xl mx-auto">
      Have a question, suggestion, or need support? We're here to guide you. Send us a message or contact us directly!
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-red-100 hover:shadow-3xl transition transform hover:-translate-y-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-red-600">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="input input-bordered w-full rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-red-600">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="input input-bordered w-full rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-red-600">Your Message</span>
            </label>
            <textarea
              name="message"
              placeholder="Type your message here..."
              required
              className="textarea textarea-bordered w-full h-36 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-500 hover:to-red-500 transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Sending Message..." : "Submit Now"}
          </button>

          {success && (
            <p className="text-green-600 font-medium text-center mt-3">{success}</p>
          )}
        </form>
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-br from-red-100 via-pink-50 to-white p-10 rounded-3xl shadow-2xl border border-red-100 flex flex-col justify-center gap-8 hover:shadow-3xl transition transform hover:-translate-y-2">
        <div className="flex items-center gap-4">
          <Phone className="w-7 h-7 text-red-700" />
          <p className="text-red-800 font-semibold">+880 987 654 321</p>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="w-7 h-7 text-red-700" />
          <p className="text-red-800 font-semibold">help@lifeblood.org</p>
        </div>

        <div className="flex items-center gap-4">
          <MapPin className="w-7 h-7 text-red-700" />
          <p className="text-red-800 font-semibold">
            Noman Ali Road,Chattogram,Bangladesh
          </p>
        </div>

        <p className="text-red-600 mt-4 text-sm md:text-base">
          Our dedicated team is available around the clock to answer your queries. Feel free to get in touch anytime!
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default ContactUs;
