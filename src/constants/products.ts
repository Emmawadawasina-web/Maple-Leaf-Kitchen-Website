import { Product } from '../services/aiService';

export const CATEGORIES = ['Cookware', 'Tableware', 'Home Essentials', 'Appliances', 'Accessories'];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bayang Enamel Casserole Set',
    description: 'Beautiful 5-piece floral enamel pot set with gold handles. Oven safe and perfect for serving directly to the table.',
    price: 65000,
    category: 'Cookware',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 45,
    stock: 12,
    tags: ['enamel', 'vintage', 'set']
  },
  {
    id: 'p2',
    name: 'Luxury Cotton Towel Set',
    description: 'Ultra-absorbent 100% Egyptian cotton towels. Available in pure white for a hotel-luxury feel.',
    price: 12500,
    category: 'Home Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1596435313615-1a74284d720b?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 156,
    stock: 200,
    tags: ['towels', 'bathroom', 'cotton']
  },
  {
    id: 'p3',
    name: 'Professional Non-Stick Wok',
    description: 'Heavy gauge steel wok with a heat-resistant handle. Ideal for deep frying and stir-pantry.',
    price: 28500,
    category: 'Cookware',
    imageUrl: 'https://images.unsplash.com/photo-1514328539411-92e92ecb620b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 34,
    stock: 15,
    tags: ['wok', 'pan', 'professional']
  },
  {
    id: 'p4',
    name: 'Fruit-Shaped Cutting Boards',
    description: 'Fun and functional anti-bacterial cutting boards shaped like oranges, lemons, and tomatoes.',
    price: 8500,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewCount: 67,
    stock: 40,
    tags: ['cutting board', 'kitchen tools']
  },
  {
    id: 'p5',
    name: 'Moshi Reed Diffuser Set',
    description: 'Premium home fragrance set featuring Cotton + Blossom, Divine Vanilla, and Breeze Town scents.',
    price: 18500,
    category: 'Home Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 28,
    stock: 30,
    tags: ['fragrance', 'diffuser', 'home']
  },
  {
    id: 'p6',
    name: '12-Piece Textured Cup & Saucer',
    description: 'Elegant white ceramic set with a unique geometric texture. Perfect for afternoon tea or morning coffee.',
    price: 35000,
    category: 'Tableware',
    imageUrl: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 19,
    stock: 8,
    tags: ['tea set', 'ceramic', 'luxury']
  },
  {
    id: 'p7',
    name: 'Vacuum Insulated Coffee Pot',
    description: 'Mint green thermo jug to keep your coffee or tea hot for up to 12 hours. Modern matte finish.',
    price: 24000,
    category: 'Tableware',
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewCount: 42,
    stock: 25,
    tags: ['thermos', 'coffee', 'jug']
  },
  {
    id: 'p8',
    name: 'Polka Dot Bamboo Tissue Box',
    description: 'Stylish ceramic tissue box with a natural bamboo lid. A perfect accent for any room.',
    price: 12000,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 15,
    stock: 50,
    tags: ['decor', 'bamboo']
  },
  {
    id: 'p9',
    name: 'Premium Silk Bed Sheet Set',
    description: 'Breatheable and cooling silk sheets for a perfect night sleep. Includes 4 pillowcases.',
    price: 45000,
    category: 'Home Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 88,
    stock: 25,
    tags: ['bedding', 'silk', 'luxury']
  },
  {
    id: 'p10',
    name: 'Orthopedic Mattress Topper',
    description: '5-inch memory foam topper to transform your existing mattress into a cloud-like experience.',
    price: 75000,
    category: 'Home Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 112,
    stock: 12,
    tags: ['health', 'comfort', 'mattress']
  },
  {
    id: 'p11',
    name: 'Cloud-Soft Cooling Pillows',
    description: 'Pair of down-alternative pillows with cooling gel technology. Medium-firm support.',
    price: 15000,
    category: 'Home Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 95,
    stock: 40,
    tags: ['pillows', 'sleep', 'home']
  }
];
