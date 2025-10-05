import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { validationResult } from "express-validator";
import slugify from "slugify";

const createBlog = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });

        const { title, excerpt, content, coverUrl, slug } = req.body;
        const finalSlug =
            slug?.trim() || slugify(title, { lower: true, strict: true });

        const existing = await BlogService.getBlogBySlug(finalSlug);
        if (existing)
            return res.status(400).json({
                success: false,
                message: "Slug already exists. Choose different title or slug.",
            });

        const blog = await BlogService.createBlog({
            title,
            slug: finalSlug,
            excerpt: excerpt || "",
            content,
            coverUrl: coverUrl || null,
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            data: blog,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getAllBlogs = async (_req: Request, res: Response) => {
    try {
        const blogs = await BlogService.getAllBlogs();
        res.json({
            success: true,
            message: "Blogs fetched successfully!",
            data: blogs,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const blog = await BlogService.getBlogById(id);
        if (!blog)
            return res
                .status(404)
                .json({ success: false, message: "Blog not found" });

        res.json({
            success: true,
            message: "Blog fetched successfully by ID!",
            data: blog,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};





const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const blog = await BlogService.getBlogBySlug(slug);
        if (!blog)
            return res
                .status(404)
                .json({ success: false, message: " Blog not found" });

        res.json({
            success: true,
            message: " Blog fetched successfully!",
            data: blog,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, excerpt, content, coverUrl, slug } = req.body;

        const finalSlug =
            slug?.trim() ||
            (title ? slugify(title, { lower: true, strict: true }) : undefined);

        const updated = await BlogService.updateBlog(id, {
            title,
            slug: finalSlug,
            excerpt,
            content,
            coverUrl,
        });

        res.json({
            success: true,
            message: "Blog updated successfully!",
            data: updated,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await BlogService.deleteBlog(id);

        res.json({
            success: true,
            message: "Blog deleted successfully!",
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const BlogController = {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    getBlogById
};
