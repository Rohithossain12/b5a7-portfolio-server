import { Router } from "express";
import { ProjectController } from "./project.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer";


const router = Router();


router.get("/", ProjectController.getAllProjects);
router.get("/slug/:slug", ProjectController.getProjectBySlug);
router.get("/:id", ProjectController.getProjectById);
router.post("/",verifyToken, upload.single("thumbnail"), ProjectController.createProject);
router.patch("/:id",verifyToken, upload.single("thumbnail"), ProjectController.updateProject);
router.delete("/:id",ProjectController.deleteProject);

export const projectRoutes = router;
