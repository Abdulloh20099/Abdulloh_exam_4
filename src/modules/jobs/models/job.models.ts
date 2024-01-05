import {model} from "mongoose";
import { Jobs,IJobs } from "../schema/job.schema.js";

export const JobModel = model<Jobs>('jobs',IJobs)
