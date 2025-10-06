import { Router } from "express";
import { BlogController } from "./blog.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer";

const router = Router();
router.post("/", verifyToken, upload.single("cover"), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById)
router.get("/:slug", BlogController.getBlogBySlug);
router.patch("/:id", upload.single("cover"), verifyToken, BlogController.updateBlog);
router.delete("/:id", verifyToken, BlogController.deleteBlog);

export const blogRoutes = router;
