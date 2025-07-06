import React from "react";
import { FaSchool } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/img.jpg";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full font-sans bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 text-black">
          <FaSchool className="text-2xl sm:text-3xl lg:text-4xl" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">SchoolERP</h1>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/select-role")}
          className="bg-gray-400 hover:bg-gray-500 text-white text-sm sm:text-base px-4 sm:px-5 py-2 rounded-full font-medium transition duration-300"
        >
          Get Started
        </button>
      </header>

      {/* Spacer for navbar */}
      <div className="h-20"></div>

      {/* Hero Image Section */}
      <div className="relative w-screen h-screen m-0 p-0 overflow-hidden">
        {/* Background Image */}
        <img
          src={backgroundImg}
          alt="Books Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Centered Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
            Welcome to the <br /> School Management System
          </h2>
          <p className="italic text-xl mt-30 sm:text-2xl md:text-3xl lg:text-xl mb-2">
            Effortless School Management Starts Here!
          </p>
          <p className="max-w-2xl mt-10 text-base md:text-lg sm:text-sm">
            "Digitize your entire school ecosystem with a cloud-based solution built for speed, reliability, and scalability. Manage users, track performance, automate attendance, and keep everyone informed – all from one secure platform."          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-600 text-white w-full mt-1">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">ACA - School Management</h3>
              <p>Streamline academic and administrative processes easily.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Login</a></li>
                <li><a href="#" className="hover:underline">Dashboard</a></li>
                <li><a href="#" className="hover:underline">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p>Email: support@aca-school.com</p>
              <p>Phone: +91 xxxxxxxxxx</p>
              <p>Location: Pune, Maharashtra</p>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} ACA. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default WelcomePage;
