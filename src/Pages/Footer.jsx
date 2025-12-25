import React from "react";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-red-50 via-pink-50 to-red-100 text-red-900 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">About Lifeblood</h3>
          <p className="text-red-700 text-sm">
            Lifeblood connects generous donors with patients in need. Every donation can help save multiple lives. Join our mission and be a life-saver today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:underline hover:text-red-500 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/search-request" className="hover:underline hover:text-red-500 transition">
                Find Donors
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:underline hover:text-red-500 transition">
                Become a Donor
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:underline hover:text-red-500 transition">
                Get in Touch
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">Reach Us</h3>
          <ul className="space-y-3 text-red-800 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5" /> +880 987 654 321
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" /> contact@lifeblood.org
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5" /> KB Aman Ali Road,Chattogram, Bangladesh
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">Connect</h3>
          <p className="text-red-700 text-sm mb-3">
            Follow us on social media to stay updated with our campaigns and events.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-red-500 transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-red-800 text-sm border-t border-red-200 pt-4">
        &copy; {new Date().getFullYear()} Lifeblood. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
