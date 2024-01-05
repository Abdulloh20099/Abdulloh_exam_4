"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewCreate = void 0;
const userModel_js_1 = require("../../auth/models/userModel.js");
const review_models_js_1 = require("../models/review.models.js");
class reviewController {
    async reviewPost(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const user = await userModel_js_1.userModel.findOne({ _id: id });
            if (!user) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            const reviewObj = await review_models_js_1.reviewModel.create({
                title: title,
                userId: user._id
            });
            user.reviews.push(reviewObj);
            await user.save();
            res.status(201).send({ status: 201, data: reviewObj, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.reviewCreate = new reviewController;
