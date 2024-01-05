"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IreviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.IreviewSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'users'
    }
});
