import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const projects = await prisma.project.findMany({
            orderBy: {
                updatedAt: "desc"
            },
        });

        return projects;
    }),

    getOne: baseProcedure
        .input(
            z.object({
                id: z.string().min(1, { message: "Project ID is required" }),
            })
        )
        .query(async ({ input }) => {
            const project = await prisma.project.findUnique({
                where: {
                    id: input.id,
                },
            });

            if (!project) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Project not found",
                });
            }

            return project;
        }),

    create: baseProcedure
        .input(
            z.object({
                value: z.string()
                    .min(1, { message: "Prompt is required" })
                    .max(1000, { message: "Prompt is too long" }),
            }),
        )
        .mutation(async ({ input }) => {
            const createdProject = await prisma.project.create({
                data: {
                    name: generateSlug(2, {
                        format: "kebab",
                    }),
                    messages: {
                        create: {
                            content: input.value,
                            role: "USER",
                            type: "RESULT",
                        }
                    }
                }
            });

            await inngest.send({
                name: "code-agent/run",
                data: {
                    input: input.value,
                    projectId: createdProject.id,
                }
            });

            return createdProject;
        }),
});