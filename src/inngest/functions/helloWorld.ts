import { inngest } from "../client";

export const helloWorld = inngest.createFunction(
  { id: "motu", name: "Hello World (Motu)" }, // `id` is fine in v2+/v3
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  }
);
