export interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  image: string;
  features: string[];
  description: string;
  specs: {
    [key: string]: string;
  };
  inStock: boolean;
  new: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}