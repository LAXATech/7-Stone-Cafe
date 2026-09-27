export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chai-coffee' | 'coolers' | 'snacks-chaats' | 'grills';
  image: string;
  rating?: number;
  reviewsCount?: number;
  isSignature?: boolean;
  addOns?: AddOn[];
  tags?: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  menuItem: MenuItem;
  quantity: number;
  selectedAddOns?: AddOn[];
}

export interface Branch {
  id: 'asaripallam' | 'rajakkamangalam';
  name: string;
  rating: number;
  ratingSource: string;
  status: string;
  address: string;
  amenities: string[];
  image: string;
  mapDirectionsUrl: string;
}
