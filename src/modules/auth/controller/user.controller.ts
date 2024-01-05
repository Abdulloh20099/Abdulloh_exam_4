import { userModel } from "../models/userModel.js";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

class userContoller{
    async get (req:Request,res:Response){
        try {
            const find = await userModel.find()
            res.status(200).send(find)
        } catch (error) {
            
        }
    }
    async SignUp (req:Request,res:Response){
        try {
            const {username,email,password}=req.body
            const SALT_ROUND = 10
            const hashPassword = bcrypt.hashSync(password,SALT_ROUND)

            const userObjCreated = {
                profileImg:req.file?.filename,
                username:username,
                email:email,
                password:hashPassword,
            }
            delete req.body.password

            if(!userObjCreated.username||!userObjCreated.email||!userObjCreated.password){
                res.status(400).json({status:400,errorMsg:'invalid body',error:true})
                return
            }

            const TokenUser = {
                username:userObjCreated.username,
                email:userObjCreated.email
            }
            
            const token = jwt.sign(TokenUser, "n126");


            const createUserObj =  (await userModel.create(userObjCreated))

            res.status(201).send({status:201,data:token,dataObj:createUserObj,error:false});
            return
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
    async SignIn (req:Request,res:Response){
        try {
            const {password,email}=req.body
            const checkUserEmail = await userModel.findOne({email});

            if(!checkUserEmail){
                res.status(404).json({status:404,errorMsg:'user not found',error:true})
                return
            }

            const comparePassword = bcrypt.compareSync(password,checkUserEmail.password);
            if(!comparePassword){
                res.status(400).json({status:400,errorMsg:'invalid password',error:true})
                return
            }
            const TokenUser = {
                username:checkUserEmail.username,
                email:checkUserEmail.email,
            }
            
            const token = jwt.sign(TokenUser, "n126");

            
            res.status(200).send({status:200,data:token,error:false})
            return

            
            
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
}

export const AuthController = new userContoller