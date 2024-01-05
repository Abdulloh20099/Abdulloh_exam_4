import { model } from "mongoose";
import { userSchema,Iuserschema } from "../schema/user.schema.js";

export const userModel = model<userSchema>('users',Iuserschema)