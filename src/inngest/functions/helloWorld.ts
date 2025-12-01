import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "../client";
import { getSandbox } from "../utils";

export const helloWorld = inngest.createFunction(
  { id: "motu", name: "Hello World (Motu)" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("s3");
      return sandbox.sandboxId;
    });

    const userInput = event.data.input;

    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js senior developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${userInput}`
    );


    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);
