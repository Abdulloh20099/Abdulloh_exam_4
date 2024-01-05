"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categoty_schema_js_1 = require("../schema/categoty.schema.js");
exports.CategoryModel = (0, mongoose_1.model)('categories', categoty_schema_js_1.ICategroySchema);
