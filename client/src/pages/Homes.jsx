import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Header></Header>
      <BlogList></BlogList>
    </>
  );
};

export default Home;
