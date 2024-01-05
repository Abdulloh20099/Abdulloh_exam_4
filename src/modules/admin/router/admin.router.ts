import { Router } from "express";
import { adminCrud } from "../controller/admin.crud.js";
import { upload } from "../../utils/multer.conf.js";
import { admincheck } from "../../category/middleware/category.middleware.js";

export const adminRouter = Router()

adminRouter.get('/admin',admincheck.adminMiddleware,adminCrud.getUsers)
adminRouter.get('/admin/:id',admincheck.adminMiddleware,adminCrud.getUsersOne)
adminRouter.post('/admin',upload.single('uploads'),admincheck.adminMiddleware,adminCrud.createUser)
adminRouter.put('/admin/:id',upload.single('uploads'),admincheck.adminMiddleware,adminCrud.updateUsers)
adminRouter.delete('/admin/:id',admincheck.adminMiddleware,adminCrud.deleteUsers)
