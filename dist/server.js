"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("./modules/utils/db.connection.js");
const category_router_js_1 = require("./modules/category/router/category.router.js");
const user_router_js_1 = require("./modules/user/router/user.router.js");
const job_router_js_1 = require("./modules/jobs/router/job.router.js");
const user_router_js_2 = require("./modules/auth/router/user.router.js");
const admin_router_js_1 = require("./modules/admin/router/admin.router.js");
const review_router_js_1 = require("./modules/review/router/review.router.js");
async function started() {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        ///Rouetrs
        app.use('/api', category_router_js_1.categoryRouter);
        app.use('/api', job_router_js_1.jobRouter);
        app.use('/api', user_router_js_2.authRouter);
        app.use('/api', admin_router_js_1.adminRouter);
        app.use('/api', review_router_js_1.reviewRouter);
        app.use('/api', user_router_js_1.userRouter);
        app.listen(process.env.APP_PORT, () => {
            console.log(`running ${process.env.APP_PORT}...`);
        });
    }
    catch (error) {
        console.log(error.message);
        process.exit(-1);
    }
}
started();
