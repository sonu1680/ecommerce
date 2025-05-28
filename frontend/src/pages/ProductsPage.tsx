import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';
import { products as allProducts } from '../data/products';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filteredProducts = [...allProducts];
    console.log(products)
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      product => {
        const price = product.discountedPrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );

    // Sort products
    switch (sortBy) {
      case 'priceLow':
        filteredProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'priceHigh':
        filteredProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sort
        break;
    }
    
    setProducts(filteredProducts);
  }, [selectedCategory, sortBy, priceRange]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="py-8 bg-teal-50">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Shop All Products</h1>
          <p className="text-teal-600">
            Discover our collection of premium electronics and tech accessories.
          </p>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={toggleFilters}
              className="w-full flex items-center justify-center bg-teal-100 px-4 py-2 rounded-lg text-teal-700 font-medium"
            >
              <Filter size={18} className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} mb-6 lg:mb-0`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="font-medium text-teal-900 mb-3 flex items-center">
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filters
                </h3>
                <hr className="my-3" />
                
                <div className="mb-4">
                  <h4 className="font-medium text-teal-800 mb-2">Price Range</h4>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2 text-sm text-teal-700">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-teal-800 mb-2">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mt-1 w-full rounded-md border-teal-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-teal-600">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
              
              <div className="hidden lg:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border-teal-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {products.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <p className="text-teal-600 mb-2">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 3000]);
                    setSortBy('featured');
                  }}
                  className="text-teal-600 font-medium hover:text-teal-800"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ProductGrid products={products} columns={3} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;