import {baseProcedure, createTRPCRouter} from "@/trpc/init";
import {z} from "zod";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";

export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const messages = await prisma.message.findMany({
            orderBy: {
                updatedAt: "desc"
            },
        });

        return messages;
    }),

    create: baseProcedure.input(
        z.object({
            value: z.string()
                .min(1,{message:"Prompt is required"})
                .max(1000,{message:"Prompt is too long"}),
            projectId: z.string().min(1,{message:"Project ID is required"})
        }),
    )
    .mutation(async ({input}) => {
        const createdMessage = await prisma.message.create({
            data:{
                projectId : input.projectId,
                content: input.value,
                role: "USER",
                type: "RESULT",
            },
        });

        await inngest.send({
            name: "code-agent/run", // Ensure this matches your Inngest event name
            data: {
                // FIX: Access `input.data.message` as per your client-side call
                // And map it to `email` if the Inngest function expects `email`
                input: input.data.message, // Assuming `message` from client maps to `email` in Inngest
                projectId : input.projectId
            }
        })

        return createdMessage;

    }),
});