import React, { useState } from 'react';
import { assets } from '../assets/assets';
import BlogCard from './BlogCard';
import { blogCategories } from '../assets/assets';
import { motion } from 'motion/react';
import { blog_data } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') {
      return blogs;
    }
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(input.toLowerCase())
    );
  };

  // const filteredBlogs =
  //   selectedCategory === 'All'
  //     ? blog_data
  //     : blog_data.filter(blog => blog.category === selectedCategory);

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 relative">
          {blogCategories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer relative
                ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  layoutId="underline"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBlogs()
            .filter(blog =>
              selectedCategory === 'All'
                ? true
                : blog.category === selectedCategory
            )
            .map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
