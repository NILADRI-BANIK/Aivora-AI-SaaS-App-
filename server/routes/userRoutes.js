import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getUserCreations,
  getPublishedCreations,
  toggleLikeCreation,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/creations", auth, getUserCreations); // FIXED: Removed "get-user-"
userRoutes.get("/published", auth, getPublishedCreations); // FIXED: Removed "get-" prefix
userRoutes.post("/like", auth, toggleLikeCreation); // FIXED: Simplified to "/like"

export default userRoutes;