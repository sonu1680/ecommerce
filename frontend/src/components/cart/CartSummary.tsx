import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';

const CartSummary: React.FC = () => {
  const { subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  
  // Constants for calculating totals
  const shipping = subtotal > 100 ? 0 : 5.99;
  // const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping & Handling</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>{formatCurrency(shipping)}</span>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-medium text-gray-900">
            <span>Order Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      {subtotal > 100 && (
        <div className="bg-green-50 text-green-800 p-3 rounded-md mb-6 text-sm flex items-start">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>You qualify for free shipping!</div>
        </div>
      )}
      
      <Button
        variant="primary"
        fullWidth
        size="lg"
        onClick={handleCheckout}
        icon={<ShoppingBag size={18} />}
        disabled={totalItems === 0}
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>We accept:</p>
        <div className="flex justify-center space-x-2 mt-2">
          <span className="px-2 py-1 bg-blue-900 text-white rounded">Visa</span>
          <span className="px-2 py-1 bg-red-600 text-white rounded">Mastercard</span>
          <span className="px-2 py-1 bg-blue-400 text-white rounded">Amex</span>
          <span className="px-2 py-1 bg-yellow-500 text-blue-900 rounded">PayPal</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;