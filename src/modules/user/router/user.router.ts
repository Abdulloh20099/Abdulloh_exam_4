import { Router } from "express";
import { userClassContoller } from "../controller/user.controller";

export const userRouter = Router();

userRouter.get('/users',userClassContoller.userGetJobs)
