import { CategoryModel } from "../../category/models/category.model.js";
import { userModel } from "../../auth/models/userModel.js";
import { JobModel } from "../models/job.models.js";
import { Request, Response } from "express";

class JobController {
  async getJobs(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit } = req.query;

      const getcount = await JobModel.find({});
      const getJobs = await JobModel.find()
        .limit(10)
        .skip(((page as any) - 1) * (limit as any));

      res
        .status(200)
        .send({
          status: 200,
          data: getJobs,
          error: false,
          dataCount: getcount.length,
        });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
  async createdJobs(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { categoryName } = req.body;

      const category = await CategoryModel.findOne({categoryName})
      const user = await userModel.findOne({_id:id})
     
      if(!category){
        res.status(404).json({status:404,errorMsg:'category not found',error:true})
        return
    }
    if(!user){
      res.status(404).json({status:404,errorMsg:'user not found',error:true})
      return
    }
      const Job = await JobModel.create({
        jobImg:req.file?.filename,
        name: req.body.name,
        price: +req.body.price,
        categoryId: category?._id,
        userId: user?._id,
      });

      category.jobs?.push(Job);
      user.jobs?.push(Job)
      await category.save();
      await user.save()
  

      res.status(201).send({ status: 201, data: Job, error: false });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
  async updateJobs(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      const { id } = req.params;

      const findJobsUpdate = await JobModel.findOne({ _id: id });
      if (!findJobsUpdate) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "Job not found", error: true });
        return;
      }

      findJobsUpdate.name = name;
      findJobsUpdate.price = price;

      await findJobsUpdate.save();
      res.status(200).send({ status: 200, data: findJobsUpdate, error: false });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
  async deleteJobs(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const findJob = await JobModel.findOne({ name:name });

      if (!findJob) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "Job not found", error: true });
        return;
      }

      await JobModel.deleteOne({ name:name });

      res.status(200).json({ status: 200, data: findJob, error: false });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
}

export const JobsController = new JobController();
