import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchemas = new Schema(
  {
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    features: { type: [String], required: true },
    description: { type: String, required: true },
    specs: {
      teleModel: { type: String, required: true },
      color: { type: String, required: true },
      memory: { type: String, required: true },
      storage: { type: String, required: true },
      demography: { type: String, required: true },
      description: { type: String, required: true },
    },
    inStock: { type: Boolean, default: true },
    new: { type: Boolean, default: false },
  },
  { timestamps: true }
);


 export const productSchema= mongoose.model("Product", ProductSchemas);
