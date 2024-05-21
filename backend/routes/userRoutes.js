import express from "express";
import {
  registerUser,
  loginUser,
  userProfile,
} from "../controllers/userController.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);

export default router;
