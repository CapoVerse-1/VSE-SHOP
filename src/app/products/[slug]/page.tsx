"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// This would typically come from an API call or database
// For now we'll use the same product data from FeaturedProducts
import { products as allProducts } from '@/data/products';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we filter from our local data
    const foundProduct = allProducts.find(p => p.slug === slug);
    setProduct(foundProduct);
    setLoading(false);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-32 flex items-center justify-center">
          <div className="animate-pulse text-2xl text-gray-400">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-montserrat font-semibold mb-6">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/collections"
              className="inline-block bg-[#724F3D] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] transition-all duration-300 hover:bg-[rgba(114,79,61,0.85)] hover:shadow-md"
            >
              BROWSE COLLECTIONS
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#724F3D]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-[#724F3D]">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-[#724F3D]">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Product Image */}
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div 
                className="aspect-square w-full bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              ></div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2 px-4">
            <h1 className="text-3xl font-montserrat font-semibold text-charcoal mb-2">{product.name}</h1>
            <p className="text-2xl font-montserrat font-bold text-charcoal mb-6">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-montserrat font-medium mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    className={`border rounded-md px-4 py-2 text-sm transition-all ${
                      selectedSize === size 
                        ? 'border-[#724F3D] bg-[rgba(114,79,61,0.1)] text-[#724F3D]' 
                        : 'border-gray-300 hover:border-[#724F3D] hover:bg-[rgba(114,79,61,0.05)]'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button 
              className="w-full bg-[rgba(114,79,61,0.85)] text-snow font-montserrat font-medium py-4 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,1)] transition-all mb-4"
              disabled={!selectedSize}
            >
              ADD TO CART
            </button>
            
            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-montserrat font-medium mb-1">Free Shipping</h3>
                  <p className="text-gray-600 text-sm">On all orders over $100</p>
                </div>
                <div>
                  <h3 className="font-montserrat font-medium mb-1">30-Day Returns</h3>
                  <p className="text-gray-600 text-sm">Money back guarantee</p>
                </div>
                <div>
                  <h3 className="font-montserrat font-medium mb-1">Secure Checkout</h3>
                  <p className="text-gray-600 text-sm">Encrypted payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 