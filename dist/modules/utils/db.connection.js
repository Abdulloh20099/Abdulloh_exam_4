"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
!(async function () {
    try {
        await (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test');
        console.log("db connection...");
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
})();
