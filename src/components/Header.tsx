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
          <button className="text-charcoal hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
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