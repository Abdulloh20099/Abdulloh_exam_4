import  express, { Application } from "express";
import "dotenv/config"
import "./modules/utils/db.connection.js"
import { categoryRouter } from "./modules/category/router/category.router.js";
import { userRouter } from "./modules/user/router/user.router.js";
import { jobRouter } from "./modules/jobs/router/job.router.js";
import { authRouter } from "./modules/auth/router/user.router.js";
import { adminRouter } from "./modules/admin/router/admin.router.js";
import { reviewRouter } from "./modules/review/router/review.router.js";
async function started ():Promise<void>{
    try {
        const app:Application = express();
        app.use(express.json())

        ///Rouetrs

        app.use('/api',categoryRouter)
        app.use('/api',jobRouter)
        app.use('/api',authRouter)
        app.use('/api',adminRouter)
        app.use('/api',reviewRouter)
        app.use('/api',userRouter)

        app.listen(process.env.APP_PORT,()=>{
            console.log(`running ${process.env.APP_PORT}...`);
            
        })
        
    } catch (error:any) {
        console.log(error.message);
        process.exit(-1)
        
    }
}

started()