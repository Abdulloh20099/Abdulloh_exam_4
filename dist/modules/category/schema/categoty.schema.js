"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICategroySchema = void 0;
const mongoose_1 = require("mongoose");
exports.ICategroySchema = new mongoose_1.Schema({
    categoryName: {
        type: String,
        required: true
    },
    jobs: [
        { type: mongoose_1.Types.ObjectId, ref: 'jobs' }
    ]
});
