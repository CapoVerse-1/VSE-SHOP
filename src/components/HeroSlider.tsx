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
    imageUrl: '/images/models/dd.png', 
    title: 'New Collection',
    subtitle: 'Visualize | Strategize | Execute',
  },
  {
    id: 2,
    imageUrl: '/images/models/gg.png',
    title: 'Luxury Streetwear',
    subtitle: 'Strength. Empowerment. Comfort. Style.',
  },
  {
    id: 3,
    imageUrl: '/images/models/erik-mclean-OwIpxrSd-XE-unsplash.png',
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
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slide container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-1500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.85)',
                transition: 'transform 7s ease-in-out',
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-snow z-10 px-4 bg-gradient-to-b from-black/30 to-black/60">
              <div className={`transform transition-all duration-1000 delay-300 ${
                index === currentSlide 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}>
                <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-center mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-montserrat font-light text-center mb-8 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="flex justify-center">
                  <button className="bg-[rgba(114,79,61,0.85)] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,1)] transition-all shadow-lg">
                    EXPLORE COLLECTION
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                index === currentSlide 
                  ? 'bg-[#724F3D] w-5' 
                  : 'bg-white/70 hover:bg-white'
              }`}
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