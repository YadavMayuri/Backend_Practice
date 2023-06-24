import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    name:String,
    email: String,
    password:String,
    pin:String,
    number:Number,
    otpfornumber:String,
    otpforemail:String,
    
})

export default mongoose.model("Users",user)
