import {Router} from "express"
import { preorder } from "../controller/preorder.js";
import { preorderSchema } from "../db_schema/preorderSchema.js";


export const preorderRouter=Router();


preorderRouter.get("/preorder", preorder);



preorderRouter.post("/products/seed", async (req, res) => {
  try {
    const existing = await preorderSchema.findOne({
      name: "Premium Wireless Headphones",
    });
    if (existing)
      return res.status(400).json({ message: "Product already exists" });

    const product = new preorderSchema({
      name: "Premium Wireless Headphones",
      originalPrice: 299.99,
      discountedPrice: 209.99,
      rating: 4.8,
      reviews: 1247,
      image: "https://i.postimg.cc/qNPg795R/TELEARGLASS-2.jpg",
      features: [
        "Active Noise Cancellation",
        "30-hour Battery Life",
        "Premium Sound Quality",
        "Comfortable Design",
      ],
      description:
        "Experience premium audio with our latest wireless headphones featuring advanced noise cancellation and exceptional battery life.",
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error seeding product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

