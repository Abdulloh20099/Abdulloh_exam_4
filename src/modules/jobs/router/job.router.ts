import { Router } from "express";
import { JobsController } from "../controller/controller.job.js";
import { jobMiddleware } from "../middleware/middleware.jobs.js";


export const jobRouter = Router();

jobRouter.get('/jobs',jobMiddleware.registerUser,JobsController.getJobs);
jobRouter.post('/jobs/:id',jobMiddleware.userjobsMiddleware,JobsController.createdJobs)
jobRouter.put('/jobs/:id',jobMiddleware.checkProfileUser,jobMiddleware.registerUser,JobsController.updateJobs)
jobRouter.delete('/jobs/:id',jobMiddleware.checkProfileUser,JobsController.deleteJobs)