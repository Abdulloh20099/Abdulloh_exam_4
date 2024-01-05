"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_model_js_1 = require("../models/category.model.js");
class categorycontroller {
    async categoryGet(req, res) {
        try {
            const { id } = req.params;
            const categoryFind = await category_model_js_1.CategoryModel.findOne({ _id: id }).populate('jobs');
            res.status(200).send({ status: 200, data: categoryFind, error: false });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async categoryCreated(req, res) {
        try {
            const { categoryName } = req.body;
            if (categoryName == undefined) {
                res.status(401).json({
                    status: 401,
                    errorMsg: "name must not be empty",
                    error: true,
                });
                return;
            }
            const created = await category_model_js_1.CategoryModel.create({
                categoryName: categoryName,
            });
            res.status(201).send({ status: 201, data: created, error: false });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async updateCategory(req, res) {
        try {
            const { categoryName } = req.body;
            const { id } = req.params;
            const findCategoryUpdate = await category_model_js_1.CategoryModel.findOne({ _id: id });
            if (!findCategoryUpdate) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "Category not found", error: true });
                return;
            }
            findCategoryUpdate.categoryName = categoryName;
            await findCategoryUpdate.save();
            res
                .status(201)
                .send({ status: 201, data: findCategoryUpdate, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, data: null, error: true });
            return;
        }
    }
    async categoryDelete(req, res) {
        try {
            const { id } = req.params;
            const findCategory = await category_model_js_1.CategoryModel.findOne({ _id: id });
            if (!findCategory) {
                res
                    .status(404)
                    .json({ status: 404, errorMsg: "category not foud", error: true });
                return;
            }
            await category_model_js_1.CategoryModel.deleteOne({ findCategory });
            res.status(200).send({ status: 200, data: findCategory, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, data: null, error: true });
            return;
        }
    }
}
exports.CategoryController = new categorycontroller();
