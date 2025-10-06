import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { validationResult } from "express-validator";
import slugify from "slugify";
import { uploadFromBuffer } from "../../config/cloudinary";


const createProject = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });

        const file = (req as any).file as Express.Multer.File | undefined;
        const {
            title,
            description,
            features,
            technologies,
            frontendUrl,
            backendUrl,
            slug,
            thumbnail: thumbnailFromBody,
        } = req.body;

        const finalSlug = slug?.trim() || slugify(title, { lower: true, strict: true });

        const existing = await ProjectService.getProjectBySlug(finalSlug);
        if (existing)
            return res.status(400).json({
                success: false,
                message: "Slug already exists. Choose different title or slug.",
            });

        const featuresArray = typeof features === "string" ? features.split(",").map(f => f.trim()) : features || [];
        const techArray = typeof technologies === "string" ? technologies.split(",").map(t => t.trim()) : technologies || [];

        let thumbnail = thumbnailFromBody || null;

        if (file) {
            const result = await uploadFromBuffer(file.buffer, "portfolio/projects");
            thumbnail = result.secure_url;
        }

        const project = await ProjectService.createProject({
            title,
            slug: finalSlug,
            description,
            features: featuresArray,
            technologies: techArray,
            frontendUrl: frontendUrl || null,
            backendUrl: backendUrl || null,
            thumbnail,
        } as any);

        res.status(201).json({
            success: true,
            message: "Project created successfully!",
            data: project,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};




const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.json({
            success: true,
            message: "Projects fetched successfully!",
            data: projects,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const getProjectBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const project = await ProjectService.getProjectBySlug(slug);
        if (!project)
            return res.status(404).json({ success: false, message: "Project not found" });

        res.json({
            success: true,
            message: "Project fetched successfully by slug!",
            data: project,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await ProjectService.getProjectById(id);
        if (!project)
            return res.status(404).json({ success: false, message: "Project not found" });

        res.json({
            success: true,
            message: "Project fetched successfully by ID!",
            data: project,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const file = (req as any).file as Express.Multer.File | undefined;
        const {
            title,
            description,
            features,
            technologies,
            frontendUrl,
            backendUrl,
            slug,
            thumbnail: thumbnailFromBody,
        } = req.body;

        const finalSlug = slug?.trim() || (title ? slugify(title, { lower: true, strict: true }) : undefined);

        const existing = await ProjectService.getProjectById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Project not found" });

        let thumbnail = thumbnailFromBody ?? existing.thumbnail ?? null;

        if (file) {
            const result = await uploadFromBuffer(file.buffer, "portfolio/projects");
            thumbnail = result.secure_url;
        }

        const featuresArray = typeof features === "string" ? features.split(",").map(f => f.trim()) : features || [];
        const techArray = typeof technologies === "string" ? technologies.split(",").map(t => t.trim()) : technologies || [];


        const updated = await ProjectService.updateProject(id, {
            title,
            slug: finalSlug,
            description,
            features: featuresArray,
            technologies: techArray,
            frontendUrl,
            backendUrl,
            thumbnail,
        } as any);

        res.json({
            success: true,
            message: "Project updated successfully!",
            data: updated,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await ProjectService.deleteProject(id);

        res.json({
            success: true,
            message: "Project deleted successfully!",
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const ProjectController = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    getProjectById,
    updateProject,
    deleteProject,
};
