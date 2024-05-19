import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req,res)=>{
    res.send("hi");
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:5000`);
});
