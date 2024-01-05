"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewareInstance = void 0;
class userMiddleware {
    async userMiddleware(req, res, next) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password || password.length < 8) {
                res
                    .status(400)
                    .json({ status: 400, errorMsg: "invalid body", error: true });
                return;
            }
            next();
        }
        catch (error) {
            res
                .status(500)
                .json({ status: 500, errorMsg: error.message, error: true });
            return;
        }
    }
}
exports.userMiddlewareInstance = new userMiddleware();
