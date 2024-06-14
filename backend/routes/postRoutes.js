import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postController.js";
import { adminGuard, authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, adminGuard, createPost);
router.put("/:slug", authGuard, adminGuard, updatePost);
router.delete("/:slug", authGuard, adminGuard, deletePost);
router.get("/:slug",getPost);
router.get("/",getAllPosts);

export default router;
