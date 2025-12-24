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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 text-center mb-6">
          Get in Touch
        </h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Whether you have questions, suggestions, or need support, we're here to help. Fill out the form or contact us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="input input-bordered w-full rounded-lg"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="input input-bordered w-full rounded-lg"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Type your message here..."
                  required
                  className="textarea textarea-bordered w-full h-32 rounded-lg"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white w-full hover:from-pink-500 hover:to-red-500 transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-green-600 font-medium text-center mt-2">{success}</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-red-50 p-8 rounded-2xl shadow-lg flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-red-600" />
              <p className="text-gray-800 font-medium">+880 123 456 789</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-red-600" />
              <p className="text-gray-800 font-medium">support@bloodbank.com</p>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-red-600" />
              <p className="text-gray-800 font-medium">
                123 Lifeline Avenue, Dhaka, Bangladesh
              </p>
            </div>

            <p className="text-gray-600 mt-4">
              Our team is available 24/7 to assist you. Don't hesitate to reach out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
