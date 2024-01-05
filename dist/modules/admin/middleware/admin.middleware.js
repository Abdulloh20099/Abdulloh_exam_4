"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superadminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class adminMiddleware {
    async admincheck(req, res, next) {
        try {
            const tokenUser = req.headers.authorization || "";
            if (!tokenUser) {
                res.status(403).json({ status: 403, errorMsg: "no token", error: true });
                return;
            }
            const verifyToken = jsonwebtoken_1.default.verify(tokenUser, "n126");
            const adminName = process.env.ADMIN_KEY;
            if (verifyToken.username == adminName) {
                next();
            }
            else {
                res
                    .status(403)
                    .json({ status: 403, errorMsg: "you are not admin", error: true });
                return;
            }
        }
        catch (error) {
            res
                .status(500)
                .json({ statsu: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.superadminMiddleware = new adminMiddleware();
