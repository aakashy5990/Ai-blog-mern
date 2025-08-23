import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <img
          src={assets.gradientBackground}
          alt="gradient background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* AI Feature Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full text-sm text-gray-700 mb-8">
          <span>New: AI feature integrated</span>
          <img src={assets.star_icon} alt="star" className="w-4 h-4" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Your own <span className="text-primary">blogging</span>
          <br />
          platform.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>

        {/* Search Bar */}
        <form action="">
          <div className="flex items-end max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for blogs"
              className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="px-8 py-4 bg-primary text-white font-medium hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
