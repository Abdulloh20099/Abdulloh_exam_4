"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const job_schema_js_1 = require("../schema/job.schema.js");
exports.JobModel = (0, mongoose_1.model)('jobs', job_schema_js_1.IJobs);
