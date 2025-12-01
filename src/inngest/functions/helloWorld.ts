import Sandbox from "@e2b/code-interpreter";

import { inngest } from "../client";
import {
  getSandboxUrl,
  SANDBOX_APP_PORT,
  SANDBOX_TEMPLATE_ID,
} from "../utils";

export const helloWorld = inngest.createFunction(
  { id: "motu", name: "Hello World (Motu)" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const { sandboxId } = await step.run("create-sandbox", async () => {
      const sandbox = await Sandbox.create(SANDBOX_TEMPLATE_ID);

      // Start Next.js dev server inside the sandbox on port 3000
      await sandbox.commands.run("npx next dev --turbopack", {
        background: true,
        cwd: "/home/user",
      });

      return { sandboxId: sandbox.sandboxId };
    });

    const sandboxUrl = await step.run("resolve-sandbox-url", async () => {
      return getSandboxUrl(sandboxId, SANDBOX_APP_PORT);
    });

    const input = event.data?.input ?? "";
    const output = input
      ? `Sandbox ready for input: ${input}`
      : "Sandbox ready for use.";

    return {
      output,
      sandboxId,
      sandboxUrl,
    };
  },
);
