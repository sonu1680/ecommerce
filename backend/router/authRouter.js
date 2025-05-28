import {Router} from "express"
import { login, signup } from "../controller/auth.js";


export const authRouter=Router();


authRouter.post("/signup",signup)
authRouter.post("/login", login);