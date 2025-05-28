import { Wishlist } from "../db_schema/wishlistSchema.js";

export const wishlist = async (req, res) => {
  try {
    const product = req.body.product;
    const productId = req.body.product.id;
    const userId = req.user.userId;

    if (!product) {
      return res.status(400).json({ message: "Product is required" });
    }

    const existingItem = await Wishlist.findOne({ userId, productId });

    if (existingItem) {
      return res.status(409).json({ message: "Product already in wishlist" });
    }

    const newEntry = new Wishlist({ productId, product, userId });
    await newEntry.save();

    res.status(201).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
    res.status(500).json({ message: "already in wishlist" });
  }
};

export const deleteWishlistItem = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const deleted = await Wishlist.findOneAndDelete({ userId, productId });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Delete wishlist error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWishlistItem = async (req, res) => {
  const userId = req.user.userId;

  try {
    const items = await Wishlist.find({ userId });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items in wishlist" });
    }

    res.status(200).json({ message: "Wishlist fetched successfully", items });
  } catch (err) {
    console.error("Fetch wishlist error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
