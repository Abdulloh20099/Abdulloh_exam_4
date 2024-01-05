import { Router } from "express";
import { CategoryController } from "../controller/category.cotroller.js";
import { admincheck } from "../middleware/category.middleware.js";

export const categoryRouter = Router();

categoryRouter.get('/category/:id', admincheck.adminMiddleware,CategoryController.categoryGet)
categoryRouter.post('/category', admincheck.adminMiddleware,CategoryController.categoryCreated)
categoryRouter.put('/category/:id',admincheck.adminMiddleware ,CategoryController.updateCategory)
categoryRouter.delete('/category/:id',admincheck.adminMiddleware ,CategoryController.categoryDelete)