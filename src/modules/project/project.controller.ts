import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { validationResult } from "express-validator";
import slugify from "slugify";


const createProject = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });

        const { title, description, features, technologies, frontendUrl, backendUrl, thumbnail, slug } = req.body;
        const finalSlug = slug?.trim() || slugify(title, { lower: true, strict: true });

        const existing = await ProjectService.getProjectBySlug(finalSlug);
        if (existing)
            return res.status(400).json({
                success: false,
                message: "Slug already exists. Choose different title or slug.",
            });

        const project = await ProjectService.createProject({
            title,
            slug: finalSlug,
            description,
            features: features || [],
            technologies: technologies || [],
            frontendUrl: frontendUrl || null,
            backendUrl: backendUrl || null,
            thumbnail: thumbnail || null,
        });

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
        const { title, description, features, technologies, frontendUrl, backendUrl, thumbnail, slug } = req.body;

        const finalSlug = slug?.trim() || (title ? slugify(title, { lower: true, strict: true }) : undefined);

        const updated = await ProjectService.updateProject(id, {
            title,
            slug: finalSlug,
            description,
            features,
            technologies,
            frontendUrl,
            backendUrl,
            thumbnail,
        });

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
