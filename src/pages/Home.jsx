import React from "react";
import Navbar from "../components/Navbar";
import Products from "./Products";
import banner from "../assets/home_banner.png"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="flex-1 container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[calc(100vh)]">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Shop the Latest Trends
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Discover exclusive collections, stylish outfits, and premium
            accessories all in one place. Make every day fashionable.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={banner}
            alt="Banner"
            className="w-full max-w-lg drop-shadow-2xl object-contain"
          />
        </div>
      </div>
      <Products />
    </div>

    
  );
};

export default HomePage;
