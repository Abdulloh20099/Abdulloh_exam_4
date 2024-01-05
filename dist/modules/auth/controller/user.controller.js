"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const userModel_js_1 = require("../models/userModel.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class userContoller {
    async get(req, res) {
        try {
            const find = await userModel_js_1.userModel.find();
            res.status(200).send(find);
        }
        catch (error) {
        }
    }
    async SignUp(req, res) {
        try {
            const { username, email, password } = req.body;
            const SALT_ROUND = 10;
            const hashPassword = bcrypt_1.default.hashSync(password, SALT_ROUND);
            const userObjCreated = {
                profileImg: req.file?.filename,
                username: username,
                email: email,
                password: hashPassword,
            };
            delete req.body.password;
            if (!userObjCreated.username || !userObjCreated.email || !userObjCreated.password) {
                res.status(400).json({ status: 400, errorMsg: 'invalid body', error: true });
                return;
            }
            const TokenUser = {
                username: userObjCreated.username,
                email: userObjCreated.email
            };
            const token = jsonwebtoken_1.default.sign(TokenUser, "n126");
            const createUserObj = (await userModel_js_1.userModel.create(userObjCreated));
            res.status(201).send({ status: 201, data: token, dataObj: createUserObj, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
    async SignIn(req, res) {
        try {
            const { password, email } = req.body;
            const checkUserEmail = await userModel_js_1.userModel.findOne({ email });
            if (!checkUserEmail) {
                res.status(404).json({ status: 404, errorMsg: 'user not found', error: true });
                return;
            }
            const comparePassword = bcrypt_1.default.compareSync(password, checkUserEmail.password);
            if (!comparePassword) {
                res.status(400).json({ status: 400, errorMsg: 'invalid password', error: true });
                return;
            }
            const TokenUser = {
                username: checkUserEmail.username,
                email: checkUserEmail.email,
            };
            const token = jsonwebtoken_1.default.sign(TokenUser, "n126");
            res.status(200).send({ status: 200, data: token, error: false });
            return;
        }
        catch (error) {
            res.status(500).json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.AuthController = new userContoller;
