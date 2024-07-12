import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "./../middlewares/authMiddleware.js";
import {
  createPostCategory,
  getPostCategories,
  updatePostCategory,
} from "../controllers/createPostCategoryController.js";

router.post("/", authGuard, adminGuard, createPostCategory);
router.get("/", getPostCategories);
router.put("/:postCategoryId", authGuard, adminGuard, updatePostCategory);

export default router;
