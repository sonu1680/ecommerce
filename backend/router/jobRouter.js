import { Router } from "express";
import { job } from "../controller/job.js";

export const jobRouter = Router();

jobRouter.post("/form", job);


