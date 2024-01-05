"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IJobs = void 0;
const mongoose_1 = require("mongoose");
exports.IJobs = new mongoose_1.Schema({
    jobImg: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'categories'
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'users'
    }
});
