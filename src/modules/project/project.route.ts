import { Router } from "express";
import { ProjectController } from "./project.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer";


const router = Router();


router.get("/", ProjectController.getAllProjects);
router.get("/slug/:slug", ProjectController.getProjectBySlug);
router.get("/:id", ProjectController.getProjectById);
router.post("/", upload.single("thumbnail"), ProjectController.createProject);
router.patch("/:id", upload.single("thumbnail"), verifyToken, ProjectController.updateProject);
router.delete("/:id", verifyToken, ProjectController.deleteProject);

export const projectRoutes = router;
