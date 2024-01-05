"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flower_models_js_1 = require("../../flowers/models/flower.models.js");
const userModel_js_1 = require("../models/userModel.js");
class userCrud {
    async getUsers(req, res) {
        try {
            const getUsers = await userModel_js_1.userModel.find();
            res.status(201).json({ status: 201, data: getUsers, error: false });
            return;
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async deleteUsers(req, res) {
        try {
            const { id } = req.params;
            const userdelete = await userModel_js_1.userModel.findOne({ _id: id });
            if (!userdelete) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            const deleteUser = await flower_models_js_1.flowerModel.deleteOne({ userdelete });
            res.status(200).send({ status: 200, data: deleteUser, error: false });
            return;
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
