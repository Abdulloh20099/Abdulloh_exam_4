"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userClassContoller = void 0;
const job_models_js_1 = require("../../jobs/models/job.models.js");
class userContoller {
    async userGetJobs(res, req) {
        try {
            const { name } = req.query;
            const findJob = await job_models_js_1.JobModel.findOne({ name });
            res.status(200).send({ status: 200, data: findJob, error: false });
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
exports.userClassContoller = new userContoller;
