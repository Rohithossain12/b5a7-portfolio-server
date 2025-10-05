import { prisma } from "../../config/db";
import { Prisma, Blog } from "@prisma/client";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    return await prisma.blog.create({
        data: payload,
    });
};

const getAllBlogs = async (): Promise<Blog[]> => {
    return await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
    });
};

const getBlogById = async (id: string): Promise<Blog | null> => {
    return await prisma.blog.findUnique({ where: { id } });
};


const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    return await prisma.blog.findUnique({
        where: { slug },
    });
};

const updateBlog = async (
    id: string,
    payload: Prisma.BlogUpdateInput
): Promise<Blog> => {
    return await prisma.blog.update({
        where: { id },
        data: payload,
    });
};

const deleteBlog = async (id: string): Promise<Blog> => {
    return await prisma.blog.delete({
        where: { id },
    });
};

export const BlogService = {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    getBlogById
};
