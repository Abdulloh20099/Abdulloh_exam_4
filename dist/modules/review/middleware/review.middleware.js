"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.review = void 0;
const userModel_js_1 = require("../../auth/models/userModel.js");
class reviewMiddleware {
    async checkuser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userModel_js_1.userModel.findOne({ _id: id }).populate('reviews');
            if (!user) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.review = new reviewMiddleware;
