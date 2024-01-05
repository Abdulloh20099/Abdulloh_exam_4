"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = void 0;
const mongoose_1 = require("mongoose");
const review_schema_1 = require("../schema/review.schema");
exports.reviewModel = (0, mongoose_1.model)('reviews', review_schema_1.IreviewSchema);
