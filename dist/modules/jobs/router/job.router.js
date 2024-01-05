"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = require("express");
const controller_job_js_1 = require("../controller/controller.job.js");
const middleware_jobs_js_1 = require("../middleware/middleware.jobs.js");
exports.jobRouter = (0, express_1.Router)();
exports.jobRouter.get('/jobs', middleware_jobs_js_1.jobMiddleware.registerUser, controller_job_js_1.JobsController.getJobs);
exports.jobRouter.post('/jobs/:id', middleware_jobs_js_1.jobMiddleware.userjobsMiddleware, controller_job_js_1.JobsController.createdJobs);
exports.jobRouter.put('/jobs/:id', middleware_jobs_js_1.jobMiddleware.checkProfileUser, middleware_jobs_js_1.jobMiddleware.registerUser, controller_job_js_1.JobsController.updateJobs);
exports.jobRouter.delete('/jobs/:id', middleware_jobs_js_1.jobMiddleware.checkProfileUser, controller_job_js_1.JobsController.deleteJobs);
