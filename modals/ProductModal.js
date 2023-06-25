import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = new Schema({
    pname : String,
    category : String,
    price : Number,
    color : String
});

export default mongoose.model("Products", Product);