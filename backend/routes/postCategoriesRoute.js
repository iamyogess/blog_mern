import express from "express";
const router = express.Router();
import { adminGuard, authGuard } from "./../middlewares/authMiddleware.js";
import {
  createPostCategory,
  deletePostCategory,
  getPostCategories,
  updatePostCategory,
} from "../controllers/createPostCategoryController.js";

router.post("/", authGuard, adminGuard, createPostCategory);
router.get("/", getPostCategories);
router.put("/:postCategoryId", authGuard, adminGuard, updatePostCategory);
router.delete("/:postCategoryId", authGuard, adminGuard, deletePostCategory);

export default router;
