"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Product, Category, products, categories } from '@/data/products';

const FeaturedProducts: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [popupProduct, setPopupProduct] = useState<number | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Category hover states
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [popupCategory, setPopupCategory] = useState<number | null>(null);
  const categoryHoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const categoryTouchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Products Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<number>(4);
  const totalSlides = Math.ceil(products.length / visibleProducts);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Categories Carousel state
  const [activeCategorySlide, setActiveCategorySlide] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState<number>(3);
  const totalCategorySlides = Math.ceil(categories.length / visibleCategories);
  const categoryCarouselRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile and set visible items
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 640) {
        setVisibleProducts(1);
        setVisibleCategories(1);
      } else if (width < 1024) {
        setVisibleProducts(2);
        setVisibleCategories(2);
      } else {
        setVisibleProducts(4);
        setVisibleCategories(3);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Product Navigation functions
  const goToSlide = (slideIndex: number) => {
    setActiveSlide(Math.max(0, Math.min(slideIndex, totalSlides - 1)));
  };

  const nextSlide = () => {
    goToSlide(activeSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(activeSlide - 1);
  };
  
  // Category Navigation functions
  const goToCategorySlide = (slideIndex: number) => {
    setActiveCategorySlide(Math.max(0, Math.min(slideIndex, totalCategorySlides - 1)));
  };

  const nextCategorySlide = () => {
    goToCategorySlide(activeCategorySlide + 1);
  };

  const prevCategorySlide = () => {
    goToCategorySlide(activeCategorySlide - 1);
  };

  // Handle mouse enter
  const handleMouseEnter = (productId: number) => {
    if (isMobile) return;
    
    setHoveredProduct(productId);
    
    // Clear any existing timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    // Set a new timer for 3 seconds
    hoverTimerRef.current = setTimeout(() => {
      setPopupProduct(productId);
    }, 1500);
  };

  // Handle mouse leave for product card only
  const handleMouseLeave = () => {
    if (isMobile || popupProduct !== null) return;
    
    setHoveredProduct(null);
    
    // Clear the timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Handle mouse leave for popup
  const handlePopupMouseLeave = () => {
    if (isMobile) return;
    
    setHoveredProduct(null);
    setPopupProduct(null);
    
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Handle touch start for mobile
  const handleTouchStart = (productId: number) => {
    if (!isMobile) return;
    
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }
    
    const timeout = setTimeout(() => {
      setPopupProduct(productId);
    }, 500);
    
    setTouchTimeout(timeout);
  };

  // Handle touch end for mobile
  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.product-popup') && !target.closest('.product-card')) {
        setPopupProduct(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add escape key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPopupProduct(null);
      }
    };

    if (popupProduct !== null) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [popupProduct]);

  // Handle mouse enter for category
  const handleCategoryMouseEnter = (categoryId: number) => {
    if (isMobile) return;
    
    setHoveredCategory(categoryId);
    
    // Clear any existing timer
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
    }
    
    // Set a new timer for 4 seconds (longer than product hover)
    categoryHoverTimerRef.current = setTimeout(() => {
      setPopupCategory(categoryId);
    }, 1500);
  };

  // Handle mouse leave for category card
  const handleCategoryMouseLeave = () => {
    if (isMobile || popupCategory !== null) return;
    
    setHoveredCategory(null);
    
    // Clear the timer
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
  };

  // Handle mouse leave for category popup
  const handleCategoryPopupMouseLeave = () => {
    if (isMobile) return;
    
    setHoveredCategory(null);
    setPopupCategory(null);
    
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
  };

  // Handle touch start for mobile category
  const handleCategoryTouchStart = (categoryId: number) => {
    if (!isMobile) return;
    
    if (categoryTouchTimeout.current) {
      clearTimeout(categoryTouchTimeout.current);
    }
    
    const timeout = setTimeout(() => {
      setPopupCategory(categoryId);
    }, 500);
    
    categoryTouchTimeout.current = timeout;
  };

  // Handle touch end for mobile category
  const handleCategoryTouchEnd = () => {
    if (!isMobile) return;
    
    if (categoryTouchTimeout.current) {
      clearTimeout(categoryTouchTimeout.current);
      categoryTouchTimeout.current = null;
    }
  };

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.product-popup') && !target.closest('.product-card')) {
        setPopupProduct(null);
      }
      if (!target.closest('.category-popup') && !target.closest('.category-card')) {
        setPopupCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add escape key handler for both popups
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPopupProduct(null);
        setPopupCategory(null);
      }
    };

    if (popupProduct !== null || popupCategory !== null) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [popupProduct, popupCategory]);

  // Render the navigation dots with sliding effect for products
  const renderNavigationDots = () => {
    // Always show exactly 5 dots
    const totalDots = 5;
    
    // Calculate which slide positions to show dots for
    let dotPositions = [];
    
    if (totalSlides <= 5) {
      // If we have 5 or fewer slides, direct mapping
      for (let i = 0; i < totalSlides; i++) {
        dotPositions.push(i);
      }
    } else {
      // For more than 5 slides, create a sliding window effect
      let startDot = activeSlide - 2;
      
      // Adjust for edge cases
      if (startDot < 0) {
        startDot = 0;
      } else if (startDot > totalSlides - 5) {
        startDot = totalSlides - 5;
      }
      
      // Create array of dot positions
      for (let i = 0; i < 5; i++) {
        dotPositions.push(startDot + i);
      }
    }
    
    return (
      <div className="flex space-x-3 h-2">
        {Array.from({ length: Math.min(totalDots, totalSlides) }).map((_, index) => {
          const slideIndex = dotPositions[index];
          
          // Visual styling based on whether this is the active slide
          const isActive = slideIndex === activeSlide;
          
          return (
            <button
              key={index}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                isActive 
                  ? 'w-5 bg-black bg-opacity-70' 
                  : 'w-2 bg-black bg-opacity-30 hover:bg-opacity-50'
              }`}
              style={{
                height: '8px',
              }}
              onClick={() => goToSlide(slideIndex)}
              aria-label={`Navigate to products group ${slideIndex + 1}`}
            />
          );
        })}
      </div>
    );
  };
  
  // Render the navigation dots with sliding effect for categories
  const renderCategoryNavigationDots = () => {
    // Always show exactly 5 dots regardless of total slides
    const totalDots = 5;
    
    // Calculate the active dot position within the 5 dots
    let dotPositions = [];
    
    if (totalCategorySlides <= 5) {
      // If we have 5 or fewer slides, direct mapping
      for (let i = 0; i < totalCategorySlides; i++) {
        dotPositions.push(i);
      }
    } else {
      // For more than 5 slides, create a sliding window effect
      let startDot = activeCategorySlide - 2;
      
      // Adjust for edge cases
      if (startDot < 0) {
        startDot = 0;
      } else if (startDot > totalCategorySlides - 5) {
        startDot = totalCategorySlides - 5;
      }
      
      // Create array of dot positions
      for (let i = 0; i < 5; i++) {
        dotPositions.push(startDot + i);
      }
    }
    
    return (
      <div className="flex space-x-3 h-2">
        {Array.from({ length: Math.min(totalDots, totalCategorySlides) }).map((_, index) => {
          const slideIndex = dotPositions[index];
          
          // Visual styling based on whether this is the active slide
          const isActive = slideIndex === activeCategorySlide;
          
          return (
            <button
              key={index}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                isActive 
                  ? 'w-5 bg-black bg-opacity-70' 
                  : 'w-2 bg-black bg-opacity-30 hover:bg-opacity-50'
              }`}
              style={{
                height: '8px',
              }}
              onClick={() => goToCategorySlide(slideIndex)}
              aria-label={`Navigate to categories group ${slideIndex + 1}`}
            />
          );
        })}
      </div>
    );
  };

  // Calculate product visibility based on index and current slide
  const getProductVisibility = (index: number) => {
    const startIndex = activeSlide * visibleProducts;
    const endIndex = startIndex + visibleProducts - 1;
    
    // Fully visible products
    if (index >= startIndex && index <= endIndex) {
      return 'visible opacity-100 scale-100';
    }
    
    // Left edge product (partially visible)
    if (index === startIndex - 1) {
      return 'visible opacity-40 scale-95 origin-right';
    }
    
    // Right edge product (partially visible)
    if (index === endIndex + 1) {
      return 'visible opacity-40 scale-95 origin-left';
    }
    
    // Hidden products
    return 'invisible opacity-0 scale-90';
  };
  
  // Calculate category visibility based on index and current slide
  const getCategoryVisibility = (index: number) => {
    const startIndex = activeCategorySlide * visibleCategories;
    const endIndex = startIndex + visibleCategories - 1;
    
    // Fully visible categories
    if (index >= startIndex && index <= endIndex) {
      return 'visible opacity-100 scale-100';
    }
    
    // Left edge category (partially visible)
    if (index === startIndex - 1) {
      return 'visible opacity-40 scale-95 origin-right';
    }
    
    // Right edge category (partially visible)
    if (index === endIndex + 1) {
      return 'visible opacity-40 scale-95 origin-left';
    }
    
    // Hidden categories
    return 'invisible opacity-0 scale-90';
  };

  return (
    <>
      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-center mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-center mb-12 font-montserrat">
            Explore our carefully curated collections
          </p>
          
          <div className="relative">
            {/* Left Arrow */}
            <button 
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow-md focus:outline-none ${activeCategorySlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              onClick={prevCategorySlide}
              disabled={activeCategorySlide === 0}
              aria-label="Previous categories"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Categories Carousel */}
            <div 
              className="overflow-hidden" 
              ref={categoryCarouselRef}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeCategorySlide * (100 / totalCategorySlides)}%)`,
                  width: `${totalCategorySlides * 100}%`
                }}
              >
                {categories.map((category, index) => (
                  <div 
                    key={category.id}
                    className={`w-full sm:w-1/2 lg:w-1/3 px-4 transition-all duration-500 ${getCategoryVisibility(index)}`}
                    style={{ 
                      flex: `0 0 ${100 / (totalCategorySlides * visibleCategories)}%` 
                    }}
                  >
                    <div 
                      className="category-card relative"
                      onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                      onMouseLeave={handleCategoryMouseLeave}
                      onTouchStart={() => handleCategoryTouchStart(category.id)}
                      onTouchEnd={handleCategoryTouchEnd}
                    >
                      <Link href={`/categories/${category.slug}`} className="block">
                        <div className="bg-gray-50 rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                          <div className="relative h-60 overflow-hidden">
                            <div
                              className="absolute inset-0 bg-gray-200 transition-transform duration-300 ease-in-out hover:scale-110"
                              style={{
                                backgroundImage: `url(${category.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transform: hoveredCategory === category.id ? 'scale(1.1)' : 'scale(1)',
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-xl font-montserrat font-semibold text-white">{category.name}</h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 font-montserrat">{category.description}</p>
                            <div className="mt-4 flex items-center text-[#724F3D] font-montserrat font-medium group cursor-pointer transition-all duration-300 hover:scale-105">
                              <span>Explore</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Arrow */}
            <button 
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow-md focus:outline-none ${activeCategorySlide === totalCategorySlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              onClick={nextCategorySlide}
              disabled={activeCategorySlide === totalCategorySlides - 1}
              aria-label="Next categories"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Navigation Dots */}
            <div className="mt-6 flex justify-center">
              <div className="bg-[#E2E2E2] bg-opacity-60 rounded-full px-4 py-1.5 flex items-center">
                {renderCategoryNavigationDots()}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/categories" 
              className="inline-block bg-[#724F3D] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] transition-all duration-300 hover:bg-[rgba(114,79,61,0.85)] hover:shadow-md hover:translate-y-[-2px] hover:scale-105"
            >
              VIEW ALL CATEGORIES
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-center mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 text-center mb-12 font-montserrat">
            Discover our premium selection of luxury streetwear
          </p>
          
          <div className="relative">
            {/* Left Arrow */}
            <button 
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md focus:outline-none ${activeSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              onClick={prevSlide}
              disabled={activeSlide === 0}
              aria-label="Previous products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Products Carousel */}
            <div 
              className="overflow-hidden" 
              ref={carouselRef}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeSlide * (100 / totalSlides)}%)`,
                  width: `${totalSlides * 100}%`
                }}
              >
                {products.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`w-full sm:w-1/2 lg:w-1/4 px-4 transition-all duration-500 ${getProductVisibility(index)}`}
                    style={{ 
                      flex: `0 0 ${100 / (totalSlides * visibleProducts)}%` 
                    }}
                  >
                    <div 
                      className="product-card relative"
                      onMouseEnter={() => handleMouseEnter(product.id)}
                      onMouseLeave={handleMouseLeave}
                      onTouchStart={() => handleTouchStart(product.id)}
                      onTouchEnd={handleTouchEnd}
                    >
                      <Link href={`/products/${product.slug}`} className="group block">
                        <div className={`bg-white rounded-[8px] overflow-hidden shadow-sm transition-all duration-300 ${hoveredProduct === product.id ? 'transform scale-[1.03] shadow-md' : ''}`}>
                          <div className="relative h-80 overflow-hidden">
                            {/* Placeholder for product image */}
                            <div
                              className="absolute inset-0 bg-gray-200 transition-transform duration-500 ease-in-out"
                              style={{
                                backgroundImage: `url(${product.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)',
                              }}
                            />
                            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-10' : 'opacity-0'}`}></div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-montserrat font-medium text-charcoal">{product.name}</h3>
                            <p className="text-lg font-montserrat font-semibold mt-2">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Arrow */}
            <button 
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md focus:outline-none ${activeSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              onClick={nextSlide}
              disabled={activeSlide === totalSlides - 1}
              aria-label="Next products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Navigation Dots */}
            <div className="mt-6 flex justify-center">
              <div className="bg-[#E2E2E2] bg-opacity-60 rounded-full px-4 py-1.5 flex items-center">
                {renderNavigationDots()}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/collections" 
              className="inline-block bg-[#724F3D] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] transition-all duration-300 hover:bg-[rgba(114,79,61,0.85)] hover:shadow-md hover:translate-y-[-2px] hover:scale-105"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>
      
      {/* Product Popup */}
      {popupProduct !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-all duration-300">
          <div 
            className="product-popup bg-white rounded-[12px] shadow-xl w-[90%] max-w-2xl overflow-hidden transform transition-all duration-500 animate-popup"
            onMouseLeave={handlePopupMouseLeave}
          >
            {products.filter(p => p.id === popupProduct).map(product => (
              <div key={product.id} className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                  <div 
                    className="h-80 md:h-full bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                  ></div>
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col">
                  <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-charcoal transition-colors"
                    onClick={() => setPopupProduct(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-montserrat font-semibold text-charcoal mb-2">{product.name}</h2>
                  <p className="text-2xl font-montserrat font-bold text-charcoal mb-4">${product.price.toFixed(2)}</p>
                  
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-montserrat font-medium mb-2">Available Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes?.map(size => (
                        <div key={size} className="border border-gray-300 rounded-md px-3 py-1 text-sm cursor-pointer hover:border-[#724F3D] hover:bg-[rgba(114,79,61,0.05)]">{size}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <button className="w-full bg-[rgba(114,79,61,0.85)] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,1)] transition-all">
                      ADD TO CART
                    </button>
                    <Link href={`/products/${product.slug}`} className="w-full mt-2 border border-[#724F3D] text-[#724F3D] font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,0.05)] transition-all block text-center">
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Popup */}
      {popupCategory !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-all duration-300">
          <div 
            className="category-popup bg-white rounded-[12px] shadow-xl w-[90%] max-w-3xl overflow-hidden transform transition-all duration-500 animate-popup"
            onMouseLeave={handleCategoryPopupMouseLeave}
          >
            {categories.filter(c => c.id === popupCategory).map(category => {
              // Get products for this category
              const categoryProducts = products.filter(p => p.categoryId === category.id);
              
              return (
                <div key={category.id} className="flex flex-col">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-montserrat font-semibold text-charcoal">{category.name}</h2>
                      <button 
                        className="text-gray-500 hover:text-charcoal transition-colors"
                        onClick={() => setPopupCategory(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2">{category.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-montserrat font-medium mb-4 text-lg">Products in this category</h3>
                    
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="grid grid-cols-1 gap-4">
                        {categoryProducts.map((product) => (
                          <div key={product.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div 
                              className="w-14 h-14 bg-center bg-cover rounded-md flex-shrink-0"
                              style={{ backgroundImage: `url(${product.imageUrl})` }}
                            ></div>
                            <div className="ml-4 flex-grow">
                              <h4 className="font-montserrat font-medium text-charcoal">{product.name}</h4>
                              <p className="text-gray-600 text-sm mt-1">${product.price.toFixed(2)}</p>
                            </div>
                            <Link href={`/products/${product.slug}`} className="text-[#724F3D] font-montserrat text-sm flex items-center hover:underline">
                              View
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-gray-200">
                    <Link 
                      href={`/categories/${category.slug}`}
                      className="w-full block text-center bg-[rgba(114,79,61,0.85)] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,1)] transition-all"
                    >
                      EXPLORE {category.name.toUpperCase()}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts; 