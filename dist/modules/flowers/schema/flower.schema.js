"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IJobs = void 0;
const mongoose_1 = require("mongoose");
exports.IJobs = new mongoose_1.Schema({
    JobName: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    CategoryJob: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'categories'
    }
});
