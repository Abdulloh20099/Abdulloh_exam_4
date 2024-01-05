import { userModel } from "../../auth/models/userModel.js";
import { JobModel } from "../../jobs/models/job.models.js";
import { Response, Request, query } from "express";

class userContoller {
  async userGetJobs(res: Response, req: Request): Promise<void> {
    try {
      const { name } = req.query;
      const findJob = await JobModel.findOne({name})
      res.status(200).send({status:200,data:findJob,error:false})
      return
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
}

export const userClassContoller = new userContoller