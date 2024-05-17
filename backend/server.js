import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//middlewares
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
