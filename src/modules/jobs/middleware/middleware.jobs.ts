import { userModel } from "../../auth/models/userModel.js";
import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../../category/models/category.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JobModel } from "../models/job.models.js";

class middlewareUserJobs {
  async userjobsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { categoryName } = req.body;
      const { id } = req.params;

      const category = await CategoryModel.findOne({ categoryName });
      const checkUser = await userModel.findOne({ _id: id });

      if (!checkUser) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "user not found", error: true });
        return;
      }
      if (!category) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "Category not found", error: true });
        return;
      }

      next();
    } catch (error: any) {
      if (error instanceof mongoose.MongooseError) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "user not found", error: true });
        return;
      }

      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization || "";
      if (!token) {
        res
          .status(401)
          .json({ status: 401, errorMsg: "no token", error: true });
        return;
      }
      const decodedToken = jwt.verify(token, "n126");

      const user = await userModel.findOne({
        email: (decodedToken as any).email,
      });
      if (!user) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "user not found", error: true });
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
  async checkProfileUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userModel.findOne({ _id: id }).populate("jobs");

      if (!user) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "user not found", error: true });
        return;
      }
      if (!user.jobs.length) {
        res
          .status(400)
          .json({ status: 403, errorMsg: "jobs not found", error: true });
        return;
      }

      next();
    } catch (error: any) {
      if (error instanceof mongoose.MongooseError) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "user not found", error: true });
        return;
      }
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
}

export const jobMiddleware = new middlewareUserJobs();
