import { model } from "mongoose";
import { ICategroySchema,categorySchema } from "../schema/categoty.schema.js";

export const CategoryModel = model<categorySchema>('categories',ICategroySchema)


