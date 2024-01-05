import { Schema,Types } from "mongoose"
import { Jobs } from "../../jobs/schema/job.schema.js"

export interface categorySchema{
    categoryName:string,
    jobs?:Array<Jobs>
} 

export const ICategroySchema = new Schema <categorySchema>({
    categoryName:{
        type:String,
        required:true
    },
    jobs:[
        {type:Types.ObjectId,ref:'jobs'}
    ]
})

