import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Define routes
app.use("/api/users", userRoutes);

// Define __dirname using ES module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error handling middleware
app.use(invalidPathHandler);
app.use(errorResponserHandler);

// Define the server's port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
