"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Product, Category, products, categories } from '@/data/products';

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
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
      
      {/* Hero section */}
      <div className="bg-gray-50 py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Explore our extensive collection of luxury pieces crafted with exceptional materials and attention to detail.
          </p>
        </div>
      </div>
      
      {/* Filter section */}
      <div className="border-b border-gray-200 sticky top-20 bg-white z-20">
        <div className="container mx-auto px-4">
          <div className="py-4 flex items-center overflow-x-auto no-scrollbar">
            <button 
              className={`whitespace-nowrap px-5 py-2 rounded-full transition-colors mr-3 ${
                activeCategory === null 
                  ? 'bg-[#724F3D] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All Products
            </button>
            
            {categories.map(category => (
              <button 
                key={category.id}
                className={`whitespace-nowrap px-5 py-2 rounded-full transition-colors mr-3 ${
                  activeCategory === category.id 
                    ? 'bg-[#724F3D] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Link href={`/products/${product.slug}`} key={product.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h3 className="font-montserrat font-medium text-lg text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 font-montserrat mb-3 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="font-montserrat font-bold text-lg">${product.price.toFixed(2)}</p>
                    <div className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 group-hover:bg-[#724F3D] transition-colors duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-montserrat text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-montserrat font-semibold mb-2">Join Our Newsletter</h2>
            <p className="text-gray-600 font-montserrat">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#724F3D] focus:border-transparent"
            />
            <button className="bg-[#724F3D] text-white font-montserrat font-medium py-3 px-6 rounded-lg transition-all hover:bg-[rgba(114,79,61,0.9)] whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 