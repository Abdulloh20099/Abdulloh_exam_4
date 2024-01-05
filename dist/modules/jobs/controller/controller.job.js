"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const category_model_js_1 = require("../../category/models/category.model.js");
const userModel_js_1 = require("../../auth/models/userModel.js");
const job_models_js_1 = require("../models/job.models.js");
class JobController {
    async getJobs(req, res) {
        try {
            const { page, limit } = req.query;
            const getcount = await job_models_js_1.JobModel.find({});
            const getJobs = await job_models_js_1.JobModel.find()
                .limit(10)
                .skip((page - 1) * limit);
            res
                .status(200)
                .send({
                status: 200,
                data: getJobs,
                error: false,
                dataCount: getcount.length,
            });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async createdJobs(req, res) {
        try {
            const { id } = req.params;
            const { categoryName } = req.body;
            const category = await category_model_js_1.CategoryModel.findOne({ categoryName });
            const user = await userModel_js_1.userModel.findOne({ _id: id });
            if (!category) {
                res.status(404).json({ status: 404, errorMsg: 'category not found', error: true });
                return;
            }
            if (!user) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            const Job = await job_models_js_1.JobModel.create({
                jobImg: req.file?.filename,
                name: req.body.name,
                price: +req.body.price,
                categoryId: category?._id,
                userId: user?._id,
            });
            category.jobs?.push(Job);
            user.jobs?.push(Job);
            await category.save();
            await user.save();
            res.status(201).send({ status: 201, data: Job, error: false });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async updateJobs(req, res) {
        try {
            const { name, price } = req.body;
            const { id } = req.params;
            const findJobsUpdate = await job_models_js_1.JobModel.findOne({ _id: id });
            if (!findJobsUpdate) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "Job not found", error: true });
                return;
            }
            findJobsUpdate.name = name;
            findJobsUpdate.price = price;
            await findJobsUpdate.save();
            res.status(200).send({ status: 200, data: findJobsUpdate, error: false });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async deleteJobs(req, res) {
        try {
            const { name } = req.body;
            const findJob = await job_models_js_1.JobModel.findOne({ name: name });
            if (!findJob) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "Job not found", error: true });
                return;
            }
            await job_models_js_1.JobModel.deleteOne({ name: name });
            res.status(200).json({ status: 200, data: findJob, error: false });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.JobsController = new JobController();
