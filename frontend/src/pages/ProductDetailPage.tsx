import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Check, Star } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products (same category, excluding current product)
        const related = products
          .slice(0, 4);
          
        setRelatedProducts(related);
      }
    }
    
    // Reset quantity when product changes
    setQuantity(1);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  if (!product) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <p className="text-gray-600">Product not found.</p>
          <Link to="/products" className="text-teal-500 font-medium hover:text-teal-700 mt-2 inline-block">
            Back to products
          </Link>
        </div>
      </Container>
    );
  }
  
  return (
    <div className="py-8 bg-teal-50">
      <Container>
        <div className="mb-6">
          <Link 
            to="/products" 
            className="inline-flex items-center text-teal-600 hover:text-teal-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product image */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="aspect-w-1 aspect-h-1 bg-teal-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          {/* Product info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                {product.new && (
                  <Badge variant="primary" className="ml-2 bg-teal-400 text-white">
                    New
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-extrabold text-teal-700 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({Math.floor(product.rating * 10)} reviews)
                </span>
              </div>
              
              <div className="mb-4">
                {product.discountedPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-semibold text-teal-700">
                      {formatCurrency(product.discountedPrice)}
                    </span>
                    <span className="ml-2 text-xl text-gray-500 line-through">
                      {formatCurrency(product.price)}
                    </span>
                    <Badge variant="error" className="ml-3 bg-teal-500 text-white">
                      Save {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </Badge>
                  </div>
                ) : (
                  <span className="text-3xl font-semibold text-teal-700">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-teal-700 mb-2">Key Features:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <Check size={16} className="text-teal-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="mr-6">
                    <label htmlFor="quantity" className="block text-sm font-medium text-teal-700 mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center border border-teal-300 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-teal-600 hover:text-teal-800 focus:outline-none"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-teal-700 min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-teal-600 hover:text-teal-800 focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="block text-sm font-medium text-teal-700 mb-1">
                      Availability
                    </div>
                    <div className={`flex items-center ${product.inStock ? 'text-teal-600' : 'text-red-600'}`}>
                      <span className={`inline-block w-2 h-2 rounded-full ${product.inStock ? 'bg-teal-600' : 'bg-red-600'} mr-1.5`}></span>
                      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<ShoppingCart size={18} />}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<Heart size={18} className={isInWishlist(product.id) ? 'fill-teal-500 text-teal-500' : ''} />}
                    onClick={handleWishlistToggle}
                    className={isInWishlist(product.id) ? 'border-teal-200 text-teal-500 hover:bg-teal-50' : '' }
                  >
                    {isInWishlist(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs section */}
        <div className="mb-16">
          <div className="border-b border-teal-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'description' ? 'border-teal-600 text-teal-600' : 'border-transparent text-teal-500 hover:text-teal-700 hover:border-teal-300'}`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'specifications' ? 'border-teal-600 text-teal-600' : 'border-transparent text-teal-500 hover:text-teal-700 hover:border-teal-300'}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'reviews' ? 'border-teal-600 text-teal-600' : 'border-transparent text-teal-500 hover:text-teal-700 hover:border-teal-300'}`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {product.description}
                </p>
                <p className="text-gray-600 mt-4">
                  Experience the perfect blend of performance and style with the {product.name}. 
                  Designed for those who demand the best, this product combines cutting-edge 
                  technology with elegant aesthetics.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-teal-200">
                  <tbody className="divide-y divide-teal-200">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-700 bg-teal-50 w-1/3 capitalize">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-teal-700">
                    Customer Reviews
                  </h3>
                  <Button variant="outline" size="sm" className="text-teal-600 hover:bg-teal-100">
                    Write a Review
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-teal-200 pb-6 last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="font-medium text-teal-700">
                            {['John D.', 'Emma S.', 'Michael T.'][i]}
                          </p>
                          <p className="text-sm text-teal-500">
                            {['March 15, 2023', 'January 8, 2023', 'April 22, 2023'][i]}
                          </p>
                        </div>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star 
                              key={j}
                              size={16}
                              className={j < [5, 4, 5][i] ? 'fill-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium text-teal-700">Great product!</h4>
                      <p className="mt-2 text-gray-600">
                        {['I love this! Highly recommend.', 'Good value for money.', 'Excellent quality, worth the price.'][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-teal-900 mb-6">Related Products</h3>
          <ProductGrid products={relatedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
