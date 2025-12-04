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
            value: z.string().min(1,{message:"Message is required"}), 
        }),
    )
    .mutation(async ({input}) => {
        const createdMessage = await prisma.message.create({
            data:{
                content: input.value,
                role: "USER",
                type: "RESULT",
            },
        });

        await inngest.send({
            name: "test/hello.world", // Ensure this matches your Inngest event name
            data: {
                // FIX: Access `input.data.message` as per your client-side call
                // And map it to `email` if the Inngest function expects `email`
                input: input.data.message, // Assuming `message` from client maps to `email` in Inngest
            }
        })

        return createdMessage;

    }),
});