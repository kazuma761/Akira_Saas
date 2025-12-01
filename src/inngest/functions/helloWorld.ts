import { Agent, openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "../client";


export const helloWorld = inngest.createFunction(
  { id: "motu", name: "Hello World (Motu)" }, // `id` is fine in v2+/v3
  { event: "test/hello.world" },
  async ({ event }) => {

     const userInput = event.data.input;

    const prdAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js senior developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: openai({ model: "gpt-4o" }),
    });

    const {output} = await prdAgent.run(`Write the following snippet: ${userInput}`);

    return { output };

  },
);
