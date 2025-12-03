// src/inngest/utils.ts
import { Sandbox } from "@e2b/code-interpreter";

export async function getSandbox(sandboxId: string) {
  if (!sandboxId) throw new Error("getSandbox requires a sandboxId");

  // Try common SDK retrievals if available
  // @ts-ignore
  if (typeof (Sandbox as any).get === "function") return await (Sandbox as any).get(sandboxId);
  // @ts-ignore
  if (typeof (Sandbox as any).fromId === "function") return await (Sandbox as any).fromId(sandboxId);
  // @ts-ignore
  if (typeof (Sandbox as any).fetch === "function") return await (Sandbox as any).fetch(sandboxId);

  // Fallback: return a minimal object with getHost(port) that produces the e2b.app style host
  return {
    sandboxId,
    getHost(port: number) {
      // Return the e2b.app host format: "3000-<sandboxId>.e2b.app"
      // Make sandboxId safe for hostnames by replacing characters that are not allowed (just in case)
      const safeId = String(sandboxId).replace(/[^a-zA-Z0-9-]/g, "-");
      return `${port}-${safeId}.e2b.app`;
    },
  };
}
