import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
