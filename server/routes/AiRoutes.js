import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRoutes = express.Router();

aiRoutes.post("/generate-article", auth, generateArticle);
aiRoutes.post("/generate-blog-title", auth, generateBlogTitle);
aiRoutes.post("/generate-image", auth, generateImage);
aiRoutes.post(
  "/remove-background", 
  auth, 
  upload.single("image"),
  removeImageBackground
);
aiRoutes.post(
  "/remove-object", 
  auth, 
  upload.single("image"),
  removeImageObject
);
aiRoutes.post("/resume-review", auth, upload.single("resume"), resumeReview); 

export default aiRoutes;