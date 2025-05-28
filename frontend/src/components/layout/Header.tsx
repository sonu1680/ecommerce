import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, Heart, User } from 'lucide-react';
import Container from '../ui/Container';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-r from-blue-100 via-white to-purple-100 backdrop-blur-sm"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 flex items-center"
          >
            <img
              src="/logo.jpeg"
              alt="Peacock Feather"
              className="w-15 h-12 mr-2 rounded-xl shadow-md"
            />
            <span className="tracking-tight hover:tracking-wider transition-all duration-200">
              TeleARGlass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              "Home",
              "TeleProducts",
              "TeleServices",
              "TeleRecruitment",
              "TeleModify",
            ].map((item, idx) => (
              <Link
                key={idx}
                to={`/${item.toLowerCase().replace("tele", "")}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-transform hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <button
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-pink-600 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/account"
              className="hidden sm:block text-gray-600 hover:text-purple-600"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-green-600"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-600 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg shadow-inner border-t border-gray-200">
          <Container>
            <div className="py-4 space-y-2">
              {[
                "Home",
                "TeleProducts",
                "TeleServices",
                "TeleRecruitment",
                "TeleModify",
                "Account",
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${item.toLowerCase().replace("tele", "")}`}
                  className="block text-gray-700 hover:text-blue-600 font-medium px-2 py-1"
                >
                  {item}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
