"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRouter = void 0;
const express_1 = require("express");
const controller_flower_js_1 = require("../controller/controller.flower.js");
exports.JobRouter = (0, express_1.Router)();
exports.JobRouter.get('/jobs', controller_flower_js_1.JobsController.getJobs);
exports.JobRouter.post('/job/:id', controller_flower_js_1.JobsController.createdJobs);
exports.JobRouter.put('/job/:id', controller_flower_js_1.JobsController.updateJobs);
