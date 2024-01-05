"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCrud = void 0;
const userModel_js_1 = require("../../auth/models/userModel.js");
const mongoose_1 = __importDefault(require("mongoose"));
class userCrud {
    async getUsers(req, res) {
        try {
            const getUsers = await userModel_js_1.userModel.find();
            res.status(200).json({ status: 200, data: getUsers, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async getUsersOne(req, res) {
        try {
            const { id } = req.params;
            const users = await userModel_js_1.userModel.findOne({ _id: id });
            if (!users) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            res.status(200).send({ stattus: 200, data: users, error: false });
            return;
        }
        catch (error) {
            if (error instanceof mongoose_1.default.MongooseError) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const userObj = {
                profileImg: req.file?.filename,
                username: username,
                email: email,
                password: password
            };
            if (!username || !email || !password) {
                res.status(400).json({ status: 400, errorMsg: 'invalid body', error: true });
                return;
            }
            const createdUser = await userModel_js_1.userModel.create(userObj);
            res.status(201).send({ status: 201, data: createdUser, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async updateUsers(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;
            const userFind = await userModel_js_1.userModel.findOne({ _id: id });
            if (!userFind) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            userFind.profileImg = req.file?.filename;
            userFind.username = username;
            userFind.email = email;
            userFind.password = password;
            await userFind.save();
            res.status(200).send({ status: 200, data: userFind, error: false });
            return;
        }
        catch (error) {
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
            const deleteUser = await userModel_js_1.userModel.deleteOne({ userdelete });
            res.status(200).send({ status: 200, data: deleteUser, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.adminCrud = new userCrud();
