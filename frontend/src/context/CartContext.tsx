import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, Product } from "../types";
import { useAuth } from "./AuthContext";
import axios from "axios";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Fetch wishlist from server when token is available
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/wishlist/getWishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const productList = res.data.items.map((item: any) => item.product);
        setWishlist(productList);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [token]);
 
  const addToCart = (product: Product, quantity = 1) => {
    const existingItem = items.find((item) => item.product.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      setItems([...items, { product, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setItems(items.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const addToWishlist = async (product: Product) => {
    if (!token) return alert("Please login first");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/addWishlist`,
        { product },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!isInWishlist(product.id)) {
        setWishlist((prev) => [...prev, product]);
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        // Already exists
      } else {
        console.error("Error adding to wishlist", err);
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/wishlist/removeWishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist((prev) => prev.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist", err);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((product) => product.id === productId);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) =>
      total +
      (item.product.discountedPrice || item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
