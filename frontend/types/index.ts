export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand: string;
  stock: number;
  sku: string;
  colors?: string[];
  sizes?: string[];
  ratings: {
    average: number;
    count: number;
  };
  reviews: string[];
  isActive: boolean;
  tags?: string[];
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  addresses: string[];
  wishlist: string[];
  isBlocked: boolean;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Order {
  _id: string;
  user: string;
  products: Array<{
    product: Product;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  totalAmount: number;
  shippingCost: number;
  tax: number;
  discount: number;
  finalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentMethod: 'stripe' | 'razorpay' | 'upi' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}
