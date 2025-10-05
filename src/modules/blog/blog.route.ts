import { Router } from "express";
import { BlogController } from "./blog.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();
router.post("/", verifyToken, BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById)
router.get("/:slug", BlogController.getBlogBySlug);
router.put("/:id", verifyToken, BlogController.updateBlog);
router.delete("/:id", verifyToken, BlogController.deleteBlog);

export const blogRoutes = router;
