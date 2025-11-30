import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';
// import { toast } from 'sonner'; // REMOVE: Not needed on the server

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        // If functionName is meant to be dynamic, use z.enum
        // If it's always "background.job" for this endpoint, consider simplifying
        functionName: z.literal("background.job"), // More specific, or z.string() if dynamic
        data: z.object({ // Make data more specific for better type safety
          message: z.string(), // Assuming the client sends { data: { message: "..." } }
          // If the Inngest function truly expects `email`, then the client should send `email` here
          // email: z.string(), // Example if client sends { data: { email: "..." } }
        }),
      }),
    )
    .mutation(async ({ input }) => {
      await inngest.send({
        name: "test/hello.world", // Ensure this matches your Inngest event name
        data: {
          // FIX: Access `input.data.message` as per your client-side call
          // And map it to `email` if the Inngest function expects `email`
          input: input.data.message, // Assuming `message` from client maps to `email` in Inngest
        }
      });
      // It's good practice to return a meaningful response from a mutation
      return {
        success: true,
        message: `Background job "${input.functionName}" initiated successfully with message: "${input.data.message}"`
      };
    }),

  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;