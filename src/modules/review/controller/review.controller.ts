import { userModel } from "../../auth/models/userModel.js";
import { Request,Response } from "express";
import { reviewModel } from "../models/review.models.js";

class reviewController{
    async reviewPost (req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params
            const {title}=req.body
            const user = await userModel.findOne({_id:id})
            if(!user){
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
            }
            const reviewObj = await reviewModel.create({
                title:title,
                userId:user._id
            })
            user.reviews.push((reviewObj as any))
            await user.save()
            res.status(201).send({status:201,data:reviewObj,error:false})
            return

        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
}

export const reviewCreate = new reviewController