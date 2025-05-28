import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const price = product.discountedPrice || product.price;
  const totalPrice = price * quantity;

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow sm:ml-6">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              Category: {product.category}
            </p> */}
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="text-lg font-medium text-gray-900">
              {formatCurrency(totalPrice)}
            </span>
            {quantity > 1 && (
              <span className="text-sm text-gray-500 block">
                {formatCurrency(price)} each
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-900 min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-600 transition-colors focus:outline-none"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;