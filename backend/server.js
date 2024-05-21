import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middlewares/errorHandler.js";

//routes
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use("/api/users", userRoutes);

//database connection
connectDB();

app.use(invalidPathHandler);
app.use(errorResponserHandler);


app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/hi", (req, res) => {
  res.send("hello k 6?");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
