import { Agent, openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "../client";


export const helloWorld = inngest.createFunction(
  { id: "motu", name: "Hello World (Motu)" }, // `id` is fine in v2+/v3
  { event: "test/hello.world" },
  async ({ event }) => {

     const userInput = event.data.input;

    const prdAgent = createAgent({
      name: "product requirement document creator",
      system: "You are an expert product requirement document creator (prd).  You write readable, concise, product requirement documents.",
      model: openai({ model: "gpt-4o" }),
    });

    const {output} = await prdAgent.run(`Write a simple one line product requirement document for the following: ${userInput}`);

    return { output };

  },
);
