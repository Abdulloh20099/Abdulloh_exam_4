import { userModel } from "../../auth/models/userModel.js";
import { NextFunction, Request,Response } from "express";

class reviewMiddleware {
    async checkuser(req:Request,res:Response,next:NextFunction):Promise<void> {
        try {
            const {id}=req.params;
            const user = await userModel.findOne({_id:id}).populate('reviews')
            if(!user){
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
            }
            next()


        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
}

export const review = new reviewMiddleware