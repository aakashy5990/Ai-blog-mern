import React from 'react';
import { assets } from '../assets/assets';
import { useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async e => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    console.log('clicked');
    setInput('');
    inputRef.current.value = '';
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden">
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
        <form onSubmit={onSubmitHandler}>
          <div className="flex items-end max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <input
              type="text"
              ref={inputRef}
              placeholder="Search blogs by title"
              className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="px-8 py-4 bg-primary text-white font-medium hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0">
        <img
          src={assets.gradientBackground}
          alt="gradient background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center z-1 mt-4">
        {input && (
          <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">
            Clear Search
          </button>
        )}
      </div>

    </div>
  );
};

export default Header;
