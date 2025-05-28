import mongoose, { Schema, Document } from "mongoose";



const ProductSchema = new Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  image: { type: String, required: true },
  features: { type: [String], required: true },
  description: { type: String, required: true },
});

export const preorderSchema= mongoose.model ("PreOrder", ProductSchema);
