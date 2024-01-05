"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobMiddleware = void 0;
const userModel_js_1 = require("../../auth/models/userModel.js");
const category_model_js_1 = require("../../category/models/category.model.js");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class middlewareUserJobs {
    async userjobsMiddleware(req, res, next) {
        try {
            const { categoryName } = req.body;
            const { id } = req.params;
            const category = await category_model_js_1.CategoryModel.findOne({ categoryName });
            const checkUser = await userModel_js_1.userModel.findOne({ _id: id });
            if (!checkUser) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "user not found", error: true });
                return;
            }
            if (!category) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "Category not found", error: true });
                return;
            }
            next();
        }
        catch (error) {
            if (error instanceof mongoose_1.default.MongooseError) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "user not found", error: true });
                return;
            }
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async registerUser(req, res, next) {
        try {
            const token = req.headers.authorization || "";
            if (!token) {
                res
                    .status(401)
                    .json({ status: 401, errorMsg: "no token", error: true });
                return;
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, "n126");
            const user = await userModel_js_1.userModel.findOne({
                email: decodedToken.email,
            });
            if (!user) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "user not found", error: true });
                return;
            }
            next();
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async checkProfileUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userModel_js_1.userModel.findOne({ _id: id }).populate("jobs");
            if (!user) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "user not found", error: true });
                return;
            }
            if (!user.jobs.length) {
                res
                    .status(400)
                    .json({ status: 403, errorMsg: "jobs not found", error: true });
                return;
            }
            next();
        }
        catch (error) {
            if (error instanceof mongoose_1.default.MongooseError) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "user not found", error: true });
                return;
            }
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.jobMiddleware = new middlewareUserJobs();
