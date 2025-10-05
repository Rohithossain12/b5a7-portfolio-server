import { PrismaClient, Prisma, Project } from "@prisma/client";

const prisma = new PrismaClient();

const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
    return await prisma.project.create({ data: payload });
};

const getAllProjects = async (): Promise<Project[]> => {
    return await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
};

const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    return await prisma.project.findUnique({ where: { slug } });
};

const getProjectById = async (id: string): Promise<Project | null> => {
    return await prisma.project.findUnique({ where: { id } });
};

const updateProject = async (id: string, payload: Prisma.ProjectUpdateInput): Promise<Project> => {
    return await prisma.project.update({ where: { id }, data: payload });
};

const deleteProject = async (id: string): Promise<Project> => {
    return await prisma.project.delete({ where: { id } });
};

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    getProjectById,
    updateProject,
    deleteProject,
};
