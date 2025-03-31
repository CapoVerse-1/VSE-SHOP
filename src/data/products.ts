// Product interfaces
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  description?: string;
  sizes?: string[];
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
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
  // More categories...
];

export const products: Product[] = [
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
  
  // More products...
]; 