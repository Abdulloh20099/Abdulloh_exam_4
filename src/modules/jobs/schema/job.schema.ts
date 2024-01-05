import { Schema, Types } from "mongoose";

export interface Jobs{
    jobImg:String
    name:String    
    categoryId:String
    price:Number
    userId:Types.ObjectId
}

export const IJobs = new Schema<Jobs>({
    jobImg:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    categoryId:{
        type:Schema.Types.ObjectId, ref:'categories'
    },
    userId:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})