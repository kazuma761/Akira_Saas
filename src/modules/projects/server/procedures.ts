import {baseProcedure, createTRPCRouter} from "@/trpc/init";
import {z} from "zod";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import {generateSlug} from "random-word-slugs";

export const projectsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const projects = await prisma.project.findMany({
            orderBy: {
                updatedAt: "desc"
            },
        });

        return projects;
    }),

    create: baseProcedure.input(
        z.object({
            value: z.string()
                .min(1,{message:"Prompt is required"})
                .max(1000,{message:"Prompt is too long"}),
        }),
    )
    .mutation(async ({input}) => {

        const createdProject = await prisma.project.create({
            data:{
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
        })

        // const createdMessage = await prisma.message.create({
        //     data:{
        //         content: input.value,
        //         role: "USER",
        //         type: "RESULT",
        //     },
        // });

        await inngest.send({
            name: "code-agent/run", // Ensure this matches your Inngest event name
            data: {
                // FIX: Access `input.data.message` as per your client-side call
                // And map it to `email` if the Inngest function expects `email`
                input: input.data.message, // Assuming `message` from client maps to `email` in Inngest
                projectId : createdProject.id,
            }
        });

        return createdProject;

    }),
});