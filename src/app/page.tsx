import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <FeaturedProducts />
      <Footer />
    </main>
  );
} 