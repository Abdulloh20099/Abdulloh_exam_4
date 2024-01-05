import { Router } from "express";
import { AuthController } from "../controller/user.controller.js";
import { userMiddlewareInstance } from "../middleware/user.middlewate.js";
import { upload } from "../../utils/multer.conf.js";

export const authRouter = Router();

authRouter.get('/users',AuthController.get)
authRouter.post('/register',upload.single('profileImg'), userMiddlewareInstance.userMiddleware,AuthController.SignUp)
authRouter.put('/login',AuthController.SignIn)