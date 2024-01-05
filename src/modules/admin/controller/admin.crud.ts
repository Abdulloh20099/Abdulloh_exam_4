import { userModel } from "../../auth/models/userModel.js";
import { Request,Response } from "express";
import mongoose from "mongoose";

class userCrud{
    async getUsers(req:Request,res:Response):Promise<void>{
        try {
            const getUsers = await userModel.find();
            res.status(200).json({status:200,data:getUsers,error:false})
            return
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
    
    async getUsersOne(req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params
            const users = await userModel.findOne({_id:id});
            if(!users){
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
            }
            res.status(200).send({stattus:200,data:users,error:false})
            return
        } catch (error:any) {
            if(error instanceof mongoose.MongooseError) {
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
              }
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }

    async createUser(req:Request,res:Response):Promise<void>{
        try {
            const {username,email,password}=req.body;
            
            const userObj={
                profileImg:req.file?.filename,
                username:username,
                email:email,
                password:password
            }

            if(!username||!email||!password){
                res.status(400).json({status:400,errorMsg:'invalid body',error:true})
                return
            }
            const createdUser= await userModel.create(userObj);


            res.status(201).send({status:201,data:createdUser,error:false})
            return
            
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }

    async updateUsers(req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params
            const {username,email,password}=req.body
            const userFind = await userModel.findOne({_id:id})

            if(!userFind){
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
            }
            (userFind as any).profileImg = req.file?.filename;
            userFind.username=username;
            userFind.email=email;
            userFind.password=password;

            await userFind.save()
            res.status(200).send({status:200,data:userFind,error:false})
            return
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }

    async deleteUsers(req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params;

            const userdelete = await userModel.findOne({_id:id})

            if(!userdelete){
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
            }
            const deleteUser = await userModel.deleteOne({userdelete})

            res.status(200).send({status:200,data:deleteUser,error:false})
            return
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
}

export const adminCrud = new userCrud()