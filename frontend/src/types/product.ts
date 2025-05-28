export interface Specs {
  teleModel: string;
  color: string;
  memory: string;
  storage: string;
  demography: string;
  description: string;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  image: string;
  features: string[];
  description: string;
  specs: Specs;
  inStock: boolean;
  new: boolean;
}
