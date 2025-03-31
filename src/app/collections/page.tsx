"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Product, Category, products, categories } from '@/data/products';

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  // Set all products by default
  useEffect(() => {
    if (activeCategory === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.categoryId === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero section - More compact */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-3">Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat text-sm">
            Explore our extensive collection of luxury pieces crafted with exceptional materials and attention to detail.
          </p>
        </div>
      </div>
      
      {/* Filter section - More sleek and minimal */}
      <div className="sticky top-20 bg-white z-20 py-3 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2">
            <button 
              className={`whitespace-nowrap px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${
                activeCategory === null 
                  ? 'bg-[#724F3D] text-white' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All Products
            </button>
            
            {categories.map(category => (
              <button 
                key={category.id}
                className={`whitespace-nowrap px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-[#724F3D] text-white' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid - Smaller products, more minimal design */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <Link 
              href={`/products/${product.slug}`} 
              key={product.id} 
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-2 bg-gray-50">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                  style={{ backgroundImage: `url(${product.imageUrl})` }}
                />
                
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-10' : 'opacity-0'
                }`} />
                
                {/* Quick view button on hover */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="bg-white bg-opacity-90 text-[#724F3D] text-xs px-3 py-1.5 rounded-full transition-transform duration-300 transform translate-y-1 group-hover:translate-y-0">
                    Quick View
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-montserrat text-sm text-gray-800 transition-colors group-hover:text-[#724F3D] line-clamp-1">{product.name}</h3>
                <p className="font-montserrat font-medium text-sm">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-montserrat text-sm">No products found in this category.</p>
          </div>
        )}
      </div>
      
      {/* Product Quick View Modal */}
      {hoveredProduct !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-md shadow-xl max-w-lg w-full mx-4 pointer-events-auto opacity-0 transform scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
            {/* Quick view content would go here */}
          </div>
        </div>
      )}
      
      {/* Newsletter Section - More minimal */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-montserrat font-semibold mb-2">Newsletter</h2>
            <p className="text-gray-600 font-montserrat text-sm">
              Subscribe to receive updates on new arrivals and offers.
            </p>
          </div>
          
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-grow px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#724F3D] focus:border-transparent text-sm"
            />
            <button className="bg-[#724F3D] text-white font-montserrat font-medium py-2 px-4 rounded-md transition-all hover:bg-[rgba(114,79,61,0.9)] text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 