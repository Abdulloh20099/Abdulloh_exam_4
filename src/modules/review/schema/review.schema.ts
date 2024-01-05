import { Schema,Types } from "mongoose";

export interface reviewSchema {
    title:String
    userId :Types.ObjectId
}

export const IreviewSchema = new Schema<reviewSchema>({
    title:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})