import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { addCart, getCart, removeCart } from "../controller/cart.js";

export const cartRouter = Router();

cartRouter.post("/addCart", authenticate, addCart);
cartRouter.post("/removeCart",authenticate, removeCart);

cartRouter.get("/getCart", authenticate, getCart);

