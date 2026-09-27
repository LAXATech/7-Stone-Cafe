import { MenuItem, Branch } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dum-chai',
    name: 'Dum Chai',
    description: 'Rich, aromatic, special milk tea',
    price: 25,
    category: 'chai-coffee',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 340,
    isSignature: true,
    addOns: [
      { id: 'ginger', name: 'Fresh Crushed Ginger', price: 5 },
      { id: 'cardamom', name: 'Extra Elaichi Aroma', price: 5 },
      { id: 'jaggery', name: 'Nattu Sakkarai (Organic Jaggery)', price: 10 }
    ],
    tags: ['Best Seller', 'Traditional', 'Must Try']
  },
  {
    id: 'bread-omelette',
    name: 'Bread Omelette',
    description: 'A classic and hearty snack made with fresh eggs, spices and soft bread. Simple, delicious and always a customer favorite.',
    price: 60,
    category: 'snacks-chaats',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 128,
    isSignature: true,
    addOns: [
      { id: 'extra-egg', name: 'Extra Egg', price: 10 },
      { id: 'cheese', name: 'Cheese', price: 15 },
      { id: 'extra-bread', name: 'Extra Bread', price: 10 }
    ],
    tags: ['Customer Favorite', 'Quick Bite']
  },
  {
    id: 'chicken-kola-urundai',
    name: 'Chicken Kola Urundai',
    description: 'Crispy spiced chicken balls',
    price: 80,
    category: 'snacks-chaats',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 215,
    isSignature: true,
    addOns: [
      { id: 'mint-chutney', name: 'Extra Mint Green Chutney', price: 10 },
      { id: 'garlic-mayo', name: 'Garlic Mayo Dip', price: 15 }
    ],
    tags: ['Chettinad Special', 'Crispy']
  },
  {
    id: 'samosa',
    name: 'Samosa',
    description: 'Onion / Potato / Chicken',
    price: 40,
    category: 'snacks-chaats',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 180,
    isSignature: true,
    addOns: [
      { id: 'sweet-tamarind', name: 'Sweet Tamarind Chutney', price: 10 },
      { id: 'extra-onion-salad', name: 'Extra Sliced Onion Salad', price: 5 }
    ],
    tags: ['Evening Special', 'Crunchy']
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    description: 'Chilled & refreshing',
    price: 70,
    category: 'coolers',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 290,
    isSignature: true,
    addOns: [
      { id: 'vanilla-icecream', name: 'Vanilla Ice Cream Scoop', price: 25 },
      { id: 'chocolate-fudge', name: 'Chocolate Fudge Drizzle', price: 15 },
      { id: 'extra-espresso', name: 'Extra Espresso Shot', price: 20 }
    ],
    tags: ['Chilled', 'Barista Blend']
  },
  {
    id: 'alfaham-chicken',
    name: 'Alfaham Chicken',
    description: 'Smoky, spicy, irresistible',
    price: 160,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 410,
    isSignature: true,
    addOns: [
      { id: 'extra-kubbus', name: 'Extra Hot Kubbus (2 pcs)', price: 20 },
      { id: 'toum-garlic', name: 'Authentic Toum Garlic Dip', price: 20 },
      { id: 'peri-peri-seasoning', name: 'Peri-Peri Rub Coating', price: 15 }
    ],
    tags: ['Charcoal Grilled', 'Chef Special']
  },
  // Additional items
  {
    id: 'filter-coffee',
    name: 'South Indian Filter Coffee',
    description: 'Traditional degree decoction brewed with fresh milk in brass dabarah',
    price: 35,
    category: 'chai-coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 156,
    tags: ['Traditional']
  },
  {
    id: 'nannari-sarbath',
    name: 'Kulungki Nannari Sarbath',
    description: 'Authentic root extract chilled herbal cooler with chia seeds & lemon',
    price: 45,
    category: 'coolers',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 92,
    tags: ['Beat the Heat']
  },
  {
    id: 'tandoori-peri-peri-grill',
    name: 'Spicy Peri-Peri Grill',
    description: 'Tender marinated chicken smoked over natural wood charcoal',
    price: 175,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 115,
    tags: ['Smoky Charcoal']
  },
  {
    id: 'bun-butter-jam',
    name: 'Bun Butter Jam',
    description: 'Warm fluffy sweet bun stuffed with rich Amul butter and mixed fruit jam',
    price: 40,
    category: 'snacks-chaats',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 88,
    tags: ['Nostalgic Snack']
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'asaripallam',
    name: 'Asaripallam',
    rating: 4.5,
    ratingSource: 'Google',
    status: 'Open 24 Hours',
    address: 'Near White Rose Nagar, Asaripallam Road, Asaripallam, Nagercoil - 629201',
    amenities: [
      'Indoor & Outdoor Seating',
      'Rooftop Seating',
      'Tree Garden',
      'Pet Friendly',
      'Close to Medical College & Sports Turfs'
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    mapDirectionsUrl: 'https://maps.google.com/?q=Asaripallam+Nagercoil'
  },
  {
    id: 'rajakkamangalam',
    name: 'Rajakkamangalam',
    rating: 4.8,
    ratingSource: 'Google',
    status: 'Open 24 Hours',
    address: 'Chotachel Road, Rajakkamangalam - Eraniel Road (directly opposite RBR Marriage Mahal), Ganapathipuram / Rajakkamangalam - 629502',
    amenities: [
      'Drive-Through & Curbside Pickup',
      'On-site Parking',
      'Live Music Events',
      'Pet Friendly',
      'Table Reservations'
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    mapDirectionsUrl: 'https://maps.google.com/?q=Rajakkamangalam+Nagercoil'
  }
];
