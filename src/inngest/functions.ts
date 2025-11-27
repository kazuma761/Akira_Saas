// src/inngest/helloWorld.ts
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "motu" },                   // function id (shows as “motu” in UI)
  { event: "test/hello.world" },    // event name
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  },
);
