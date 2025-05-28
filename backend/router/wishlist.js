import {Router} from "express"
import { deleteWishlistItem, getWishlistItem, wishlist } from "../controller/wishlist.js";
import { authenticate } from "../middleware/authMiddleware.js";


export const wishlistRouter=Router();


wishlistRouter.post("/addWishlist",authenticate, wishlist);
wishlistRouter.delete(
  "/removeWishlist/:productId",authenticate,
  deleteWishlistItem
);
wishlistRouter.get("/getWishlist",authenticate, getWishlistItem);
