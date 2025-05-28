import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { authRouter } from "./router/authRouter.js";
import { wishlistRouter } from "./router/wishlist.js";
import { contactRouter } from "./router/contact.js";
import { preorderRouter } from "./router/preorderRoute.js";
import { cartRouter } from "./router/cartRouter.js";
import { productRouter } from "./router/productRouter.js";
import { jobRouter } from "./router/jobRouter.js";




const app=express();
const PORT=3001;
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/order", preorderRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/application", jobRouter);

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce"
).then(()=>{

    app.listen(PORT, () => {
      console.log(`server is listening at ${PORT}`);
    }); 

}).catch((e)=>{
console.llog("error",e)
})

