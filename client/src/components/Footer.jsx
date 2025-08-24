import React from 'react';
import { assets } from '../assets/assets';
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-primary/6 text-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Information Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={assets.logo} alt="Quickblog Logo" className="w-32 sm:w-44" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
              unde quaerat eveniet cumque accusamus atque qui error quo enim
              fugiat?
            </p>
          </div>

          {/* Quick Links Column */}
          {footer_data.map((section,index) => (
            <div className="space-y-4" key={index}>
                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                <ul className="space-y-2">
                {section.links.map((link,i) =>(
                    <li key={i}>
                        <a
                        href="#"
                        className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                        {link}
                        </a>
                    </li>
                ))}
                </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            Copyright 2025 © QuickBlog GreatStack - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
