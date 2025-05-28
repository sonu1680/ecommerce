import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity: Number,
});

export const CartScehma = mongoose.model("CartItem", CartItemSchema);
