"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const Page = () => {
  const [isPending, setIsPending] = useState(false);

  const handleInvoke = async () => {
    setIsPending(true);
    try {
      const response = await fetch("/api/trigger-hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "motu@example.com",
        }),
      });

      if (response.ok) {
        toast.success("Background job started successfully!");
      } else {
        const body = await response.json().catch(() => ({}));
        toast.error(
          `Failed to start background job: ${body?.error ?? "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error(
        `Failed to start background job: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Akira - Background Jobs</h1>
      <p className="mb-4 text-gray-600">
        Trigger a background Inngest function that says hello after 10 seconds.
      </p>

      <Button disabled={isPending} onClick={handleInvoke}>
        {isPending ? "Starting..." : "Invoke HelloWorld Job"}
      </Button>
    </div>
  );
};

export default Page;
