import { Router } from "express";
import { ProjectController } from "./project.controller";
import { verifyToken } from "../../middlewares/auth.middleware";


const router = Router();


router.get("/", ProjectController.getAllProjects);
router.get("/slug/:slug", ProjectController.getProjectBySlug);
router.get("/:id", ProjectController.getProjectById);
router.post("/", verifyToken, ProjectController.createProject);
router.put("/:id", verifyToken, ProjectController.updateProject);
router.delete("/:id", verifyToken, ProjectController.deleteProject);

export const projectRoutes = router;
