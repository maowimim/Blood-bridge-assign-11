import React from "react";
import { Heart, Users, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Give the Gift of Life",
    description:
      "Each blood donation can save multiple lives. Step up and make a difference today.",
    color: "bg-red-500",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Join a Caring Community",
    description:
      "Connect with fellow donors who support their community and help those in need.",
    color: "bg-pink-500",
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: "Fast & Convenient",
    description:
      "Donating blood is quick, safe, and easy — you can help save lives in under an hour.",
    color: "bg-red-400",
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Safe & Trusted",
    description:
      "We follow strict health protocols to ensure every donor and recipient is protected.",
    color: "bg-pink-400",
  },
];

const FeaturedSection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-red-50 via-pink-50 to-white overflow-hidden">
      {/* Decorative diagonal shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-100 rounded-full rotate-45 opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-100 rounded-full rotate-12 opacity-30"></div>

      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
          Why Become a Blood Donor?
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Donating blood is easy, safe, and life-changing. Learn why your donation matters and how you can help save lives today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto ${feature.color} transition-transform group-hover:scale-110`}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-500 transition">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
