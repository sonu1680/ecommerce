import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import ProductGrid from '../product/ProductGrid';
import { useProducts } from '../../context/ProductContext';

const FeaturedProducts: React.FC = () => {

  const { products } = useProducts();

  return (
    <section className="py-16 bg-gradient-to-b from-teal-100 via-sky-100 to-violet-100 text-gray-900">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-teal-700 mb-2">
              Featured Products
            </h2>
            <p className="text-sky-700 max-w-2xl">
              Discover our selection of premium TeleARGlass products, carefully
              curated for quality and performance.
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 md:mt-0 inline-flex items-center text-violet-600 font-medium hover:text-violet-800 transition-colors"
          >
            View all products <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
};

export default FeaturedProducts;
