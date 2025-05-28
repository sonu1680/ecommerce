import { preorderSchema } from "../db_schema/preorderSchema.js";

export const preorder=async(req, res) => {
  try {
    const products = await preorderSchema.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
}
