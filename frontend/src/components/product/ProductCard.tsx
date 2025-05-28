import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductCardProps {
  product:Product ;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    //@ts-ignore
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      //@ts-ignore
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative">
          <div className="aspect-w-3 aspect-h-2 bg-gray-100 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
          >
            <Heart 
              size={18} 
              className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
          
          {product.new && (
            <div className="absolute top-3 left-3">
              <Badge variant="primary">New</Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          {/* <div className="mb-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
          </div> */}
          
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-1">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-medium text-gray-500 ml-1">
              {product.rating}
            </span>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center mb-2">
              {product.discountedPrice ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(product.discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            <Button
              variant="primary"
              fullWidth
              icon={<ShoppingCart size={16} />}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;