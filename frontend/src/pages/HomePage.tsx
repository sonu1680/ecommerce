import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import Preorder from '../components/Preorder';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Preorder />
      <Newsletter />
    </div>
  );
};

export default HomePage;