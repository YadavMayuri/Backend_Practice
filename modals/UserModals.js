import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    name: String,
    email: String,
    password: String,
    pin: String,
    number: Number,
    otpfornum: String,
    otpforemail: String,
    isotpnumverify: { type: Boolean, default: false },
    isemailverify: { type: Boolean, default: false },
    access_token: String,
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }]

})

export default mongoose.model("Users", user)
