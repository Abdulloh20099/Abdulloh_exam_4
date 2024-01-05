import {model} from "mongoose"
import { reviewSchema,IreviewSchema } from "../schema/review.schema"

export const reviewModel = model<reviewSchema>('reviews',IreviewSchema)