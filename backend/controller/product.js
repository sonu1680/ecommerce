import { productSchema } from "../db_schema/productSchema.js";

export const addProduct= async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📃 Get All Products
export const getProduct= async (req, res) => {
  try {
    const products = await productSchema.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ❌ Delete Product by ID
export const removeProduct=async (req, res) => {
  console.log(req.params.id);
  try {
    const id=req.params.id;
    const deleted = await productSchema.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted", product: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
