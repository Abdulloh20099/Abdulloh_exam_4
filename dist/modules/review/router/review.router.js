"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const review_middleware_js_1 = require("../middleware/review.middleware.js");
const review_controller_js_1 = require("../controller/review.controller.js");
exports.reviewRouter = (0, express_1.Router)();
exports.reviewRouter.post('/review/:id', review_middleware_js_1.review.checkuser, review_controller_js_1.reviewCreate.reviewPost);
