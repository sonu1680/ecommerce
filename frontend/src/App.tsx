import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import RecruitmentForm from './pages/RecruitmentForm';
import { AuthProvider } from './context/AuthContext';
import Wishlist from './pages/Wishlist';
import UserDashboard from './pages/UserDashboard';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ContactForm from './pages/ContactForm';
import Checkout from './pages/Checkout';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <AuthProvider>
          <ProductProvider>

      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />

              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="/recruitment" element={<RecruitmentForm />} />
              <Route path="/account" element={<UserDashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/modify" element={<ContactForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
      </ProductProvider>

    </AuthProvider>
  );
}

export default App;