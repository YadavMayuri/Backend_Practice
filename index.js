console.log("hii");

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/UserRoutes.js";

const app=express();

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1',router)

mongoose.connect('mongodb+srv://mayuriyadav54:HGU1ZbJCNcqlTu0z@cluster0.s9gcceb.mongodb.net/backendTPracrice')
.then(()=> console.log("DB connected"))
.catch((err) => console.log("DB errer", err));


app.listen(3000 , ()=> console.log("working on port 3000"));

