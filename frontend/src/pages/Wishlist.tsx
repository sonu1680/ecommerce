import { useEffect, useState } from "react";
import ProductGrid from "../components/product/ProductGrid";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Heart, Loader2 } from "lucide-react";

const Wishlist = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWishlistItems = async () => {
    setLoading(true);
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
      setProducts(productList);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getWishlistItems();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <Heart className="w-12 h-12 mb-2" />
        <p>Please login to view your wishlist.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-medium">
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <Heart className="w-10 h-10 mb-2" />
        <p className="text-lg">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Your Wishlist
      </h2>
      <ProductGrid products={products} columns={3} />
    </div>
  );
};

export default Wishlist;
