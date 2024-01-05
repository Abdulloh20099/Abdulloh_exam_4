import multer from "multer"
import {extname} from "path";

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'jobs.multer')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,file.fieldname+uniqueSuffix+extname(file.originalname))
    }
})

export const upload = multer({storage:storage})