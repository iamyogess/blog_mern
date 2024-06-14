import express from "express";
import { createComment } from "../controllers/commentController.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createComment);

export default router;
