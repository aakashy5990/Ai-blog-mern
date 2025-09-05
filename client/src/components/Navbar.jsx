import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const { navigate, token } = useAppContext();

  return (
    <nav className="flex justify-between items-center px-18 py-4 bg-white">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <img
          onClick={() => {
            navigate('/');
          }}
          src={assets.logo}
          alt="QuickBlog Logo"
          className="h-8 w-auto cursor-pointer"
        />
      </div>

      {/* Right side - Admin Login Button */}
      <div>
        <button
          onClick={() => {
            navigate('/admin');
          }}
          className="px-6 py-2 rounded-lg font-medium text-white flex gap-2 transition-all duration-200 hover:opacity-90 bg-primary cursor-pointer"
        >
          {token ? 'DashBoard' : 'Admin Login'}
          <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
