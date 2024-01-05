import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"

class categoryMiddleware {
    async adminMiddleware(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const tokenUser = req.headers.authorization||'';
            if(!tokenUser){
                res.status(401).json({status:401,errorMsg:"no token",error:true})
                return
            }
            const verifyToken = jwt.verify(tokenUser,'n126');
            const adminName = process.env.ADMIN_KEY;
           

            if(((verifyToken as any).username==adminName)){
                next()
            }else{
                res.status(403).json({status:403,errorMsg:'you are not admin',error:true})
                return
            }
            
        } catch (error:any) {
            res.status(500).json({status:500,errorMsg:error.message,error:true})
            return
        }
    }
}

export const admincheck = new categoryMiddleware