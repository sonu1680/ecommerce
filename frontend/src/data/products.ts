import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'kids',
    name: 'Kids',
  },
  {
    id: 'adults',
    name: 'Adults',
  },
  {
    id: 'young',
    name: 'Young',
  },
  {
    id: 'old',
    name: 'Old',
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'TeleAR 118X',
    price: 1000,
    rating: 4.8,
    image: 'https://i.postimg.cc/qNPg795R/TELEARGLASS-2.jpg',
    features: [
      '9GB RAM',
      '128GB SSD',
    ],
    description: 'Smart glasses have been advancing significantly across multiple sectors, including design. These wearable gadgets are equipped with the ability to display augmented reality (AR) and mixed reality (MR) content. It possesses the potential to fundamentally transform how designers conceive, cooperate on, and assess their creative endeavors.',
    specs: {
      teleModel: 'TeleAR 118X',
      color: 'Violet',
      memory: '9GB',
      storage: '128GB NVMe SSD',
      demography: 'Kids',
      description: "Smart glasses have been advancing significantly across multiple sectors, including design. These wearable gadgets are equipped with the ability to display augmented reality (AR) and mixed reality (MR) content. It possesses the potential to fundamentally transform how designers conceive, cooperate on, and assess their creative endeavors.",
    },
    inStock: true,
    new: true
  },
  {
    id: '2',
    name: 'TeleAR 156X',
    price: 1400,
    discountedPrice: 1399,
    rating: 4.9,
    image: 'https://i.postimg.cc/v4gcbQXk/TELEARGLASS-1.jpg',
    features: [
      '11GB RAM',
      '200GB SSD'
    ],
    description: 'Smart glasses have been advancing significantly across multiple sectors, including design. These wearable gadgets are equipped with the ability to display augmented reality (AR) and mixed reality (MR) content. It possesses the potential to fundamentally transform how designers conceive, cooperate on, and assess their creative endeavors.',
    specs: {
      teleModel: 'TeleAR 156X',
      color: 'Red',
      memory: '11GB',
      storage: '200GB NVMe SSD',
      demography: 'Adults',
      description: "Smart glasses have been advancing significantly across multiple sectors, including design. These wearable gadgets are equipped with the ability to display augmented reality (AR) and mixed reality (MR) content. It possesses the potential to fundamentally transform how designers conceive, cooperate on, and assess their creative endeavors.",
    },
    inStock: true,
    new: true
  },
  {
    id: '3',
    name: 'TeleAR 269X',
    price: 1800,
    rating: 4.7,
    image: 'https://i.postimg.cc/qNPg795R/TELEARGLASS-2.jpg',
    features: [
      '14GB RAM',
      '259GB SSD'
    ],
    description: 'Smart glasses have been advancing significantly across multiple sectors, including design. These wearable gadgets are equipped with the ability to display augmented reality (AR) and mixed reality (MR) content. It possesses the potential to fundamentally transform how designers conceive, cooperate on, and assess their creative endeavors.',
    specs: {
      teleModel: 'TeleAR 269X',
      color: 'Maroon',
      memory: '14GB',
      storage: '259GB NVMe SSD',
      demography: 'Aged',
      description: "Smart glasses have been advancing significantly across multiple sectors, including design. These wearable gadgets are equipped with the ability to display augmented reality (AR) and mixed reality (MR) content. It possesses the potential to fundamentally transform how designers conceive, cooperate on, and assess their creative endeavors.",
    },
    inStock: true,
    new: false
  }
];

export const featuredProducts = [
  products[0],
  products[1],
  products[2],
];