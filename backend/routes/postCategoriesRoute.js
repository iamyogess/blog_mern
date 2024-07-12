import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "./../middlewares/authMiddleware.js";
import { createPostCategory } from "../controllers/createPostCategoryController.js";

router.post("/", authGuard, adminGuard, createPostCategory);

export default router;
