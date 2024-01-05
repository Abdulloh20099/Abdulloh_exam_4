import {connect} from "mongoose";
 
!(async function (){
    try {
        await connect('mongodb://127.0.0.1:27017/test')
        console.log("db connection...");
        return true
    } catch (error:any) {
        console.log(error.message);
        return false
    }
})()