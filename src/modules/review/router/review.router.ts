import { Router } from "express";
import { review } from "../middleware/review.middleware.js";
import { reviewCreate } from "../controller/review.controller.js";

export const reviewRouter=Router();

reviewRouter.post('/review/:id',review.checkuser,reviewCreate.reviewPost)