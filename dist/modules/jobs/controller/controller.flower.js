"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const category_model_js_1 = require("../../category/models/category.model.js");
const flower_models_js_1 = require("../models/flower.models.js");
class JobController {
    async getJobs(req, res) {
        try {
            const getJobs = await flower_models_js_1.JobModel.find();
            res.status(200).send({ status: 202, data: getJobs, error: false });
            return;
        }
        catch (error) {
            console.log(error.message);
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async createdJobs(req, res) {
        try {
            const { id } = req.params;
            const category = await category_model_js_1.CategoryModel.findOne({ _id: id });
            if (!category) {
                res.status(404).json({ status: 404, errorMsg: 'category not found', error: true });
                return;
            }
            const flower = await flower_models_js_1.JobModel.create({
                JobName: req.body.JobName,
                price: +req.body.price,
                CategoryJob: category._id
            });
            res.status(202).send({ status: 202, data: flower, error: false });
            return;
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async updateJobs(req, res) {
        try {
            const { JobName, price } = req.body;
            const { id } = req.params;
            const findJobsUpdate = await flower_models_js_1.JobModel.findOne({ _id: id });
            if (!findJobsUpdate) {
                res.status(404).json({ status: 404, errorMsg: 'flower not found', error: true });
                return;
            }
            findJobsUpdate.JobName = JobName;
            findJobsUpdate.price = price;
            await findJobsUpdate.save();
            res.status(201).send({ status: 201, data: findJobsUpdate, error: false });
            return;
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async deleteJobs(req, res) {
        try {
            const { id } = req.params;
            const findFlowers = await flower_models_js_1.JobModel.findOne({ _id: id });
            if (!findFlowers) {
                res.status(404).json({ status: 404, errorMsg: 'flower not found', error: true });
                return;
            }
            await flower_models_js_1.JobModel.deleteOne({ _id: id });
            res.status(201).json({ status: 201, data: findFlowers, error: false });
            return;
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.JobsController = new JobController;
