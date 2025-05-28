import { Router } from "express";
import { contactus } from "../controller/contactus.js";

export const contactRouter = Router();

contactRouter.post("/addContact", contactus);
