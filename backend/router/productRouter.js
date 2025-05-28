import { Router } from "express";
import { addProduct, getProduct, removeProduct } from "../controller/product.js";


export const productRouter = Router();

productRouter.post("/addProduct", addProduct);
productRouter.delete("/removeProduct/:id", removeProduct);

productRouter.get("/getProduct", getProduct);

