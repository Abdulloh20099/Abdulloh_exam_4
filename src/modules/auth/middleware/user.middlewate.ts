import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

class userMiddleware {
  async userMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      

       if (!username || !email || !password || password.length < 8) {
         res
           .status(400)
           .json({ status: 400, errorMsg: "invalid body", error: true });
         return;
       }

      next();
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
 
}

export const userMiddlewareInstance = new userMiddleware();
