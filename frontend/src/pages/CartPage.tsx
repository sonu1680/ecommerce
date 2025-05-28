import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, clearCart, totalItems } = useCart();

  return (
    <div className="py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems === 0
              ? 'Your cart is empty.'
              : `You have ${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart.`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={26} className="text-indigo-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products yet.
            </p>
            <Button asChild variant="primary">
              <Link to="/products" className="flex items-center gap-2">
                Continue Shopping
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-600"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 flex justify-between">
                <Button asChild variant="outline">
                  <Link to="/products" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
                    Continue Shopping
                  </Link>
                </Button>

                <Link to="/checkout">
                  <Button variant="primary" icon={<ArrowRight size={18} />}>
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>

            {/* Summary Section */}
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
