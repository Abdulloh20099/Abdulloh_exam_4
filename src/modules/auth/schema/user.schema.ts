import { Schema, Types } from "mongoose"
import { Jobs } from "../../jobs/schema/job.schema.js"

export interface userSchema{
    profileImg:string,
    username:string,
    email:string,
    password:string,
    jobs:Array<Jobs>
    reviews:Array<Jobs>
}

export const Iuserschema = new Schema<userSchema>({
    profileImg:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    jobs:[
        {type:Types.ObjectId,ref:'jobs'}
    ],
    reviews:[
        {type:Types.ObjectId,ref:'reviews'}
    ]

})