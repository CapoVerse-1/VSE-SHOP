"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  description?: string;
  sizes?: string[];
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Men',
    imageUrl: '/images/models/amir-abbaspoor-AQK4pg-PTjs-unsplash.png',
    slug: 'men',
    description: 'Sophisticated menswear with premium materials and timeless design.'
  },
  {
    id: 2,
    name: 'Women',
    imageUrl: '/images/models/jose-p-ortiz-ZHmcpK7kHVg-unsplash.png',
    slug: 'women',
    description: 'Elegant womenswear crafted with attention to detail and style.'
  },
  {
    id: 3,
    name: 'Accessories',
    imageUrl: '/images/models/gesphotoss-Yc0mwK1O2f4-unsplash.png',
    slug: 'accessories',
    description: 'Distinctive watches, jewelry, bags and other fine accoutrements.'
  },
  {
    id: 4,
    name: 'Footwear',
    imageUrl: '/images/models/erik-mclean-OwIpxrSd-XE-unsplash.png',
    slug: 'footwear',
    description: 'Expertly crafted boots, sneakers and shoes for every occasion.'
  },
  {
    id: 5,
    name: 'Collections',
    imageUrl: '/images/models/ahmadreza-rezaie-pyN1EPApynI-unsplash.png',
    slug: 'collections',
    description: 'Explore our latest seasonal collections and limited edition pieces.'
  },
  {
    id: 6,
    name: 'Outerwear',
    imageUrl: '/images/models/jose-p-ortiz-tGEy_8m0I8w-unsplash.png',
    slug: 'outerwear',
    description: 'Premium jackets, coats and vests designed for style and protection.'
  },
  {
    id: 7,
    name: 'Knitwear',
    imageUrl: '/images/models/meysam-jarahkar-NMYG69BG_Jg-unsplash.png',
    slug: 'knitwear',
    description: 'Luxurious sweaters, cardigans and pullovers crafted from premium fibers.'
  },
  {
    id: 8,
    name: 'Denim',
    imageUrl: '/images/models/gg.png',
    slug: 'denim',
    description: 'Premium jeans and denim pieces with exceptional fit and quality.'
  },
  {
    id: 9,
    name: 'Formal',
    imageUrl: '/images/models/dd.png',
    slug: 'formal',
    description: 'Sophisticated suits, dresses and attire for special occasions.'
  },
  {
    id: 10,
    name: 'Loungewear',
    imageUrl: '/images/models/erik-mclean-iRtivXvZNcs-unsplash.png',
    slug: 'loungewear',
    description: 'Comfortable yet elegant pieces designed for relaxation and home.'
  },
  {
    id: 11,
    name: 'Limited Edition',
    imageUrl: '/images/models/amir-abbaspoor-AQK4pg-PTjs-unsplash.png',
    slug: 'limited-edition',
    description: 'Exclusive pieces available for a limited time with unique designs.'
  },
  {
    id: 12,
    name: 'Jewelry',
    imageUrl: '/images/models/jose-p-ortiz-ZHmcpK7kHVg-unsplash.png',
    slug: 'jewelry',
    description: 'Exquisite necklaces, rings, bracelets and earrings for timeless elegance.'
  },
  {
    id: 13,
    name: 'Watches',
    imageUrl: '/images/models/gesphotoss-Yc0mwK1O2f4-unsplash.png',
    slug: 'watches',
    description: 'Precision timepieces crafted with exceptional materials and artistry.'
  },
  {
    id: 14,
    name: 'Fragrance',
    imageUrl: '/images/models/ahmadreza-rezaie-pyN1EPApynI-unsplash.png',
    slug: 'fragrance',
    description: 'Sophisticated scents that capture essence and evoke emotion.'
  },
  {
    id: 15,
    name: 'Home',
    imageUrl: '/images/models/jose-p-ortiz-tGEy_8m0I8w-unsplash.png',
    slug: 'home',
    description: 'Luxury decor, textiles and accessories to elevate your living space.'
  }
];

const products: Product[] = [
  // Men (categoryId: 1)
  {
    id: 1,
    name: 'Premium Tailored Suit',
    price: 899.99,
    imageUrl: '/images/tshirts/1.png',
    slug: 'premium-tailored-suit',
    description: 'Expertly tailored suit crafted from Italian wool with meticulous attention to detail.',
    sizes: ['48', '50', '52', '54', '56'],
    categoryId: 1
  },
  {
    id: 2,
    name: 'Cashmere Blend Sweater',
    price: 249.99,
    imageUrl: '/images/tshirts/2.png',
    slug: 'cashmere-blend-sweater',
    description: 'Luxuriously soft cashmere blend sweater perfect for elevated casual looks.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 1
  },
  {
    id: 3,
    name: 'Selvedge Denim Jeans',
    price: 189.99,
    imageUrl: '/images/tshirts/3.png',
    slug: 'selvedge-denim-jeans',
    description: 'Premium selvedge denim jeans with exceptional craftsmanship and durability.',
    sizes: ['30', '32', '34', '36', '38'],
    categoryId: 1
  },
  
  // Women (categoryId: 2)
  {
    id: 4,
    name: 'Silk Evening Dress',
    price: 549.99,
    imageUrl: '/images/tshirts/4.png',
    slug: 'silk-evening-dress',
    description: 'Elegant silk evening dress with handcrafted details and timeless silhouette.',
    sizes: ['XS', 'S', 'M', 'L'],
    categoryId: 2
  },
  {
    id: 5,
    name: 'Merino Wool Coat',
    price: 699.99,
    imageUrl: '/images/tshirts/5.png',
    slug: 'merino-wool-coat',
    description: 'Sophisticated merino wool coat with clean lines and exceptional warmth.',
    sizes: ['S', 'M', 'L'],
    categoryId: 2
  },
  {
    id: 6,
    name: 'Designer Blouse',
    price: 299.99,
    imageUrl: '/images/tshirts/6.png',
    slug: 'designer-blouse',
    description: 'Exquisite blouse crafted from premium fabric with meticulous attention to detail.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    categoryId: 2
  },
  
  // Accessories (categoryId: 3)
  {
    id: 7,
    name: 'Leather Tote Bag',
    price: 459.99,
    imageUrl: '/images/tshirts/7.png',
    slug: 'leather-tote-bag',
    description: 'Versatile leather tote crafted from the finest calfskin with signature hardware.',
    sizes: ['One Size'],
    categoryId: 3
  },
  {
    id: 8,
    name: 'Italian Silk Scarf',
    price: 189.99,
    imageUrl: '/images/tshirts/8.png',
    slug: 'italian-silk-scarf',
    description: 'Luxurious Italian silk scarf featuring unique patterns and exceptional finish.',
    sizes: ['One Size'],
    categoryId: 3
  },
  {
    id: 9,
    name: 'Designer Sunglasses',
    price: 299.99,
    imageUrl: '/images/tshirts/9.png',
    slug: 'designer-sunglasses',
    description: 'Premium designer sunglasses with UV protection and distinctive styling.',
    sizes: ['One Size'],
    categoryId: 3
  },
  
  // Footwear (categoryId: 4)
  {
    id: 10,
    name: 'Handcrafted Leather Boots',
    price: 499.99,
    imageUrl: '/images/tshirts/10.png',
    slug: 'handcrafted-leather-boots',
    description: 'Meticulously handcrafted leather boots featuring Goodyear welt construction.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    categoryId: 4
  },
  {
    id: 11,
    name: 'Luxury Sneakers',
    price: 349.99,
    imageUrl: '/images/tshirts/11.png',
    slug: 'luxury-sneakers',
    description: 'Premium leather sneakers handmade in Italy with exceptional comfort and style.',
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    categoryId: 4
  },
  {
    id: 12,
    name: 'Suede Loafers',
    price: 399.99,
    imageUrl: '/images/tshirts/12.png',
    slug: 'suede-loafers',
    description: 'Sophisticated suede loafers with leather soles and exceptional craftsmanship.',
    sizes: ['40', '41', '42', '43', '44'],
    categoryId: 4
  },
  
  // Collections (categoryId: 5)
  {
    id: 13,
    name: 'Summer Resort Collection Set',
    price: 799.99,
    imageUrl: '/images/tshirts/13.png',
    slug: 'summer-resort-collection-set',
    description: 'Exclusive resort wear set from our summer collection featuring premium linen.',
    sizes: ['S', 'M', 'L'],
    categoryId: 5
  },
  {
    id: 14,
    name: 'Autumn Essentials Bundle',
    price: 899.99,
    imageUrl: '/images/tshirts/14.png',
    slug: 'autumn-essentials-bundle',
    description: 'Curated selection of autumn essentials featuring our signature pieces.',
    sizes: ['M', 'L', 'XL'],
    categoryId: 5
  },
  {
    id: 15,
    name: 'Winter Capsule Collection',
    price: 1299.99,
    imageUrl: '/images/tshirts/15.png',
    slug: 'winter-capsule-collection',
    description: 'Limited edition winter capsule collection with exclusive designs and premium materials.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 5
  },
  
  // Outerwear (categoryId: 6)
  {
    id: 16,
    name: 'Cashmere Overcoat',
    price: 899.99,
    imageUrl: '/images/tshirts/16.png',
    slug: 'cashmere-overcoat',
    description: 'Luxurious cashmere overcoat with exceptional warmth and sophisticated styling.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 6
  },
  {
    id: 17,
    name: 'Leather Biker Jacket',
    price: 799.99,
    imageUrl: '/images/hoodies/BLACK FRONT.png',
    slug: 'leather-biker-jacket',
    description: 'Premium leather biker jacket with distinctive hardware and exceptional craftsmanship.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 6
  },
  {
    id: 18,
    name: 'Waterproof Trench Coat',
    price: 649.99,
    imageUrl: '/images/hoodies/BLUE FRONT.png',
    slug: 'waterproof-trench-coat',
    description: 'Sophisticated waterproof trench coat with classic design and modern details.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    categoryId: 6
  },
  
  // Knitwear (categoryId: 7)
  {
    id: 19,
    name: 'Merino Wool Cardigan',
    price: 349.99,
    imageUrl: '/images/hoodies/GREEN FRONT.png',
    slug: 'merino-wool-cardigan',
    description: 'Refined merino wool cardigan offering exceptional warmth and remarkable softness.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 7
  },
  {
    id: 20,
    name: 'Cashmere Turtleneck',
    price: 399.99,
    imageUrl: '/images/hoodies/PINK23.png',
    slug: 'cashmere-turtleneck',
    description: 'Luxuriously soft cashmere turtleneck with timeless design and exceptional comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    categoryId: 7
  },
  {
    id: 21,
    name: 'Alpaca Blend Sweater',
    price: 299.99,
    imageUrl: '/images/hoodies/AA.png',
    slug: 'alpaca-blend-sweater',
    description: 'Distinctive alpaca blend sweater with unique texture and incredible warmth.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 7
  },
  
  // Denim (categoryId: 8)
  {
    id: 22,
    name: 'Japanese Selvedge Jeans',
    price: 249.99,
    imageUrl: '/images/hoodies/PINK.png',
    slug: 'japanese-selvedge-jeans',
    description: 'Premium Japanese selvedge denim jeans with exceptional construction and authentic details.',
    sizes: ['30', '32', '34', '36', '38'],
    categoryId: 8
  },
  {
    id: 23,
    name: 'Tailored Denim Jacket',
    price: 289.99,
    imageUrl: '/images/hoodies/GREEN.png',
    slug: 'tailored-denim-jacket',
    description: 'Perfectly tailored denim jacket crafted from premium denim with distinctive details.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 8
  },
  {
    id: 24,
    name: 'Stretch Denim Slim Fit',
    price: 199.99,
    imageUrl: '/images/hoodies/BLACK2.png',
    slug: 'stretch-denim-slim-fit',
    description: 'Premium stretch denim with exceptional comfort and perfect slim fit silhouette.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    categoryId: 8
  },
  
  // Formal (categoryId: 9)
  {
    id: 25,
    name: 'Italian Wool Tuxedo',
    price: 1299.99,
    imageUrl: '/images/hoodies/4.png',
    slug: 'italian-wool-tuxedo',
    description: 'Exquisite Italian wool tuxedo with satin details and impeccable construction.',
    sizes: ['48', '50', '52', '54', '56'],
    categoryId: 9
  },
  {
    id: 26,
    name: 'Silk Evening Gown',
    price: 899.99,
    imageUrl: '/images/hoodies/brown2 front.png',
    slug: 'silk-evening-gown',
    description: 'Breathtaking silk evening gown with hand-embellished details and fluid silhouette.',
    sizes: ['XS', 'S', 'M', 'L'],
    categoryId: 9
  },
  {
    id: 27,
    name: 'French Cuff Dress Shirt',
    price: 179.99,
    imageUrl: '/images/hoodies/WHITE FRONT.png',
    slug: 'french-cuff-dress-shirt',
    description: 'Immaculate dress shirt with French cuffs crafted from Egyptian cotton.',
    sizes: ['15', '15.5', '16', '16.5', '17'],
    categoryId: 9
  },
  
  // Loungewear (categoryId: 10)
  {
    id: 28,
    name: 'Cashmere Lounge Set',
    price: 499.99,
    imageUrl: '/images/hoodies/brown2.png',
    slug: 'cashmere-lounge-set',
    description: 'Indulgent cashmere lounge set offering exceptional comfort with refined elegance.',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryId: 10
  },
  {
    id: 29,
    name: 'Silk Pajama Set',
    price: 349.99,
    imageUrl: '/images/hoodies/GREEN2.png',
    slug: 'silk-pajama-set',
    description: 'Luxurious silk pajama set with contrast piping and exceptional comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    categoryId: 10
  },
  {
    id: 30,
    name: 'Organic Cotton Robe',
    price: 189.99,
    imageUrl: '/images/hoodies/AA2.png',
    slug: 'organic-cotton-robe',
    description: 'Premium organic cotton robe offering exceptional comfort and absorbency.',
    sizes: ['S/M', 'L/XL'],
    categoryId: 10
  },
  
  // Limited Edition (categoryId: 11)
  {
    id: 31,
    name: 'Designer Collaboration Jacket',
    price: 1499.99,
    imageUrl: '/images/hoodies/WHITE2.png',
    slug: 'designer-collaboration-jacket',
    description: 'Exclusive limited edition designer collaboration jacket with unique details and numbered certification.',
    sizes: ['S', 'M', 'L'],
    categoryId: 11
  },
  {
    id: 32,
    name: 'Artisan Crafted Silk Scarf',
    price: 399.99,
    imageUrl: '/images/hoodies/ss.png',
    slug: 'artisan-crafted-silk-scarf',
    description: 'Limited edition hand-painted silk scarf featuring exclusive artwork and signed by the artist.',
    sizes: ['One Size'],
    categoryId: 11
  },
  {
    id: 33,
    name: 'Anniversary Collection Watch',
    price: 2499.99,
    imageUrl: '/images/hoodies/AA F.png',
    slug: 'anniversary-collection-watch',
    description: 'Limited numbered edition timepiece commemorating our anniversary with exclusive complications.',
    sizes: ['One Size'],
    categoryId: 11
  },
  
  // Jewelry (categoryId: 12)
  {
    id: 34,
    name: 'Diamond Tennis Bracelet',
    price: 3999.99,
    imageUrl: '/images/hoodies/brown.png',
    slug: 'diamond-tennis-bracelet',
    description: 'Exquisite diamond tennis bracelet featuring 3 carats of brilliant-cut diamonds in white gold setting.',
    sizes: ['One Size'],
    categoryId: 12
  },
  {
    id: 35,
    name: 'Sapphire Statement Necklace',
    price: 2799.99,
    imageUrl: '/images/hoodies/BLUE.png',
    slug: 'sapphire-statement-necklace',
    description: 'Breathtaking sapphire and diamond statement necklace with platinum chain and secure clasp.',
    sizes: ['One Size'],
    categoryId: 12
  },
  {
    id: 36,
    name: 'Pearl Drop Earrings',
    price: 899.99,
    imageUrl: '/images/hoodies/WHITE.png',
    slug: 'pearl-drop-earrings',
    description: 'Elegant South Sea pearl drop earrings with diamond accents in 18k gold settings.',
    sizes: ['One Size'],
    categoryId: 12
  },
  
  // Watches (categoryId: 13)
  {
    id: 37,
    name: 'Automatic Chronograph Watch',
    price: 4999.99,
    imageUrl: '/images/hoodies/BLACK.png',
    slug: 'automatic-chronograph-watch',
    description: 'Precision automatic chronograph with in-house movement, sapphire crystal, and exhibition caseback.',
    sizes: ['One Size'],
    categoryId: 13
  },
  {
    id: 38,
    name: 'Dress Watch with Leather Strap',
    price: 2999.99,
    imageUrl: '/images/hoodies/PINK2.png',
    slug: 'dress-watch-with-leather-strap',
    description: 'Elegant dress watch featuring slim profile, guilloche dial, and hand-stitched alligator strap.',
    sizes: ['One Size'],
    categoryId: 13
  },
  {
    id: 39,
    name: 'Diver\'s Watch',
    price: 3499.99,
    imageUrl: '/images/hoodies/42.png',
    slug: 'divers-watch',
    description: 'Professional diver\'s watch with 300m water resistance, ceramic bezel, and exceptional luminosity.',
    sizes: ['One Size'],
    categoryId: 13
  },
  
  // Fragrance (categoryId: 14)
  {
    id: 40,
    name: 'Signature Eau de Parfum',
    price: 189.99,
    imageUrl: '/images/hoodies/BLUE2.png',
    slug: 'signature-eau-de-parfum',
    description: 'Our signature scent featuring notes of bergamot, jasmine, and sandalwood in a distinctive bottle.',
    sizes: ['50ml', '100ml'],
    categoryId: 14
  },
  {
    id: 41,
    name: 'Exclusive Oud Fragrance',
    price: 299.99,
    imageUrl: '/images/tshirts/1.png',
    slug: 'exclusive-oud-fragrance',
    description: 'Captivating fragrance featuring rare oud, Bulgarian rose, and amber with exceptional longevity.',
    sizes: ['75ml'],
    categoryId: 14
  },
  {
    id: 42,
    name: 'Limited Edition Perfume Set',
    price: 449.99,
    imageUrl: '/images/tshirts/2.png',
    slug: 'limited-edition-perfume-set',
    description: 'Exclusive fragrance collection featuring three complementary scents in travel-friendly sizes.',
    sizes: ['3x30ml'],
    categoryId: 14
  },
  
  // Home (categoryId: 15)
  {
    id: 43,
    name: 'Cashmere Throw Blanket',
    price: 399.99,
    imageUrl: '/images/tshirts/3.png',
    slug: 'cashmere-throw-blanket',
    description: 'Sumptuous cashmere throw blanket offering exceptional softness and warmth with elegant finish.',
    sizes: ['One Size'],
    categoryId: 15
  },
  {
    id: 44,
    name: 'Crystal Decanter Set',
    price: 599.99,
    imageUrl: '/images/tshirts/4.png',
    slug: 'crystal-decanter-set',
    description: 'Exquisite hand-cut crystal decanter with matching tumblers in presentation box.',
    sizes: ['One Size'],
    categoryId: 15
  },
  {
    id: 45,
    name: 'Egyptian Cotton Bedding',
    price: 349.99,
    imageUrl: '/images/tshirts/5.png',
    slug: 'egyptian-cotton-bedding',
    description: 'Luxurious 1000 thread count Egyptian cotton bedding set with sateen finish.',
    sizes: ['Queen', 'King'],
    categoryId: 15
  }
];

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
    }, 3000);
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
    }, 800);
    
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
    }, 4000);
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
    }, 800);
    
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
      <div className="relative h-3 w-32">
        {Array.from({ length: Math.min(totalDots, totalSlides) }).map((_, index) => {
          const slideIndex = dotPositions[index];
          
          // Visual styling based on whether this is the active slide
          const isActive = slideIndex === activeSlide;
          
          // Position dots evenly
          const position = index / (Math.min(totalDots, totalSlides) - 1 || 1) * 100;
          
          return (
            <button
              key={index}
              className="absolute top-0 transition-all duration-300 rounded-full focus:outline-none"
              style={{
                left: `${position}%`,
                transform: `translateX(-50%) ${isActive ? 'scale(1.25)' : 'scale(1)'}`,
                width: isActive ? '10px' : '8px',
                height: isActive ? '10px' : '8px',
                backgroundColor: 'black',
                opacity: isActive ? 0.7 : (Math.abs(slideIndex - activeSlide) === 1 ? 0.3 : 0.15),
                zIndex: isActive ? 10 : 5
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
    let activeDotPosition;
    
    if (totalCategorySlides <= 5) {
      // If we have 5 or fewer slides, direct mapping
      activeDotPosition = activeCategorySlide;
    } else {
      // For more than 5 slides, we need to map the active slide to the correct dot position
      if (activeCategorySlide === 0) {
        // First slide always maps to first dot
        activeDotPosition = 0;
      } else if (activeCategorySlide === totalCategorySlides - 1) {
        // Last slide always maps to last dot
        activeDotPosition = 4;
      } else {
        // Map the intermediate slides proportionally
        activeDotPosition = Math.round(1 + (activeCategorySlide - 1) * 3 / (totalCategorySlides - 2));
      }
    }
    
    return (
      <div className="relative h-3 w-32">
        {Array.from({ length: totalDots }).map((_, index) => {
          // Calculate the slide this dot represents
          let slideIndex;
          
          if (totalCategorySlides <= 5) {
            // Direct mapping for 5 or fewer slides
            slideIndex = index;
          } else {
            // Calculate which slide this dot represents
            if (index === 0) {
              slideIndex = 0; // First dot always represents first slide
            } else if (index === 4) {
              slideIndex = totalCategorySlides - 1; // Last dot always represents last slide
            } else {
              // Intermediate dots represent proportionally spaced slides
              const step = (totalCategorySlides - 2) / 3;
              slideIndex = Math.round(1 + (index - 1) * step);
            }
          }
          
          // Visual styling based on dot's relation to active dot
          const distance = Math.abs(index - activeDotPosition);
          const opacity = distance === 0 ? 0.7 : (distance === 1 ? 0.3 : 0.15);
          
          return (
            <button
              key={index}
              className="absolute top-0 transition-all duration-300 rounded-full focus:outline-none"
              style={{
                left: `${(index / 4) * 100}%`,
                transform: `translateX(-50%) ${index === activeDotPosition ? 'scale(1.25)' : 'scale(1)'}`,
                width: index === activeDotPosition ? '10px' : '8px',
                height: index === activeDotPosition ? '10px' : '8px',
                backgroundColor: 'black',
                opacity: opacity,
                zIndex: index === activeDotPosition ? 10 : 5
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
                            <div className="mt-4 flex items-center text-[#724F3D] font-montserrat font-medium">
                              <span>Explore</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
              className="inline-block bg-[#724F3D] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] transition-all duration-300 hover:bg-[rgba(114,79,61,0.85)] hover:shadow-md hover:translate-y-[-2px]"
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
              className="inline-block bg-[#724F3D] text-snow font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] transition-all duration-300 hover:bg-[rgba(114,79,61,0.85)] hover:shadow-md hover:translate-y-[-2px]"
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
                    <button className="w-full mt-2 border border-[#724F3D] text-[#724F3D] font-montserrat font-medium py-3 px-8 tracking-wider rounded-[12px] hover:bg-[rgba(114,79,61,0.05)] transition-all">
                      VIEW DETAILS
                    </button>
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