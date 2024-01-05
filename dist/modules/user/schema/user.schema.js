"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iuserschema = void 0;
const mongoose_1 = require("mongoose");
exports.Iuserschema = new mongoose_1.Schema({
    profileImg: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    jobs: [
        { type: mongoose_1.Types.ObjectId, ref: 'jobs' }
    ],
    reviews: [
        { type: mongoose_1.Types.ObjectId, ref: 'reviews' }
    ]
});
