"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/vse-logo-03.png" 
            alt="VSE Luxury" 
            width={800} 
            height={400} 
            className="h-16 w-auto object-contain" 
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/collections" className="text-charcoal font-montserrat font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-[12px] bg-[rgba(179,179,179,0.18)] transition-all hover:bg-[rgba(179,179,179,0.4)]">
            Collections
          </Link>
          <Link href="/about" className="text-charcoal font-montserrat font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-[12px] bg-[rgba(114,79,61,0.18)] transition-all hover:bg-[rgba(114,79,61,0.4)]">
            About
          </Link>
          <Link href="/contact" className="text-charcoal font-montserrat font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-[12px] bg-[rgba(179,179,179,0.18)] transition-all hover:bg-[rgba(179,179,179,0.4)]">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-charcoal hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button className="text-charcoal hover:text-[#724F3D] transition-colors duration-300 relative group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-6 h-6">
              <path d="M5 7h13.79a2 2 0 0 1 1.94 2.5l-1.33 4a2 2 0 0 1-1.93 1.5H7.13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 7l-.81-3.24A1 1 0 0 0 3.22 3H2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="19.5" r="1.5" fill="currentColor" />
              <circle cx="17.5" cy="19.5" r="1.5" fill="currentColor" />
              <path d="M5 7l1 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute -top-1 -right-1 bg-[#724F3D] text-white text-[9px] font-medium rounded-full h-3.5 w-3.5 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              0
            </div>
          </button>
          <button className="md:hidden text-charcoal hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 