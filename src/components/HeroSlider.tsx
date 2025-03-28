"use client";

import React, { useState, useEffect } from 'react';

// Define the slide interface
interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

// Demo slides
const slides: Slide[] = [
  {
    id: 1,
    imageUrl: '/images/hero-1.jpg', // These will be placeholder URLs until we have actual images
    title: 'New Collection',
    subtitle: 'Visualize | Strategize | Execute',
  },
  {
    id: 2,
    imageUrl: '/images/hero-2.jpg',
    title: 'Luxury Streetwear',
    subtitle: 'Strength. Empowerment. Comfort. Style.',
  },
  {
    id: 3,
    imageUrl: '/images/hero-3.jpg',
    title: 'Premium Quality',
    subtitle: 'Craftsmanship at its finest',
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slide container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Placeholder div for image (we'll use next/image when we have real images) */}
            <div
              className="absolute inset-0 bg-black/30"
              style={{
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-snow z-10 px-4">
              <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-center mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl font-montserrat font-light text-center mb-8">
                {slide.subtitle}
              </p>
              <button className="bg-[rgba(114,79,61,0.85)] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,1)] transition-all shadow-md">
                EXPLORE COLLECTION
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider; 