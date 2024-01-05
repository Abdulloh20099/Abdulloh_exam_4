"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const flower_schema_js_1 = require("../schema/flower.schema.js");
exports.JobModel = (0, mongoose_1.model)('flowers', flower_schema_js_1.IJobs);
