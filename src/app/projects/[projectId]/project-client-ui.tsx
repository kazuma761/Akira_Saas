"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  role: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  projectId?: string | null;
};

interface ProjectClientUIProps {
  projectId: string;
}

export const ProjectClientUI = ({ projectId }: ProjectClientUIProps) => {
  const [value, setValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  // 🔹 Fetch messages for this project
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/trigger-hello?projectId=${encodeURIComponent(projectId)}`,
          {
            method: "GET",
          }
        );

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data?.error ?? "Failed to fetch messages");
        }

        setMessages(data.messages ?? []);
      } catch (err) {
        console.error(err);
        toast.error(
          `Failed to load messages: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [projectId]);

  // 🔹 Send a new message within this project
  const handleInvoke = async (value: string) => {
    setIsPending(true);
    try {
      const response = await fetch("/api/trigger-hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: value,
          projectId,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        const created = body.message as Message | undefined;
        if (created) {
          setMessages((prev) => [created, ...prev]);
        }

        toast.success("Background job started successfully!");
        setValue("");
      } else {
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
      <h1 className="text-2xl font-bold mb-2">Project</h1>

      <p className="text-xs text-gray-500 mb-4">
        Project ID: <span className="font-mono">{projectId}</span>
      </p>

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
      />

      <Button
        disabled={isPending}
        onClick={() => handleInvoke(value)}
        className="mt-2"
      >
        {isPending ? "Starting..." : "Invoke Code Agent"}
      </Button>

      <div className="mt-6 space-y-2">
        <h2 className="text-lg font-semibold">Messages</h2>

        {isLoadingMessages ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((m) => (
              <li
                key={m.id}
                className="border rounded-md p-2 text-sm flex items-center justify-between"
              >
                <span>{m.content}</span>
                <span className="text-xs text-gray-400">
                  {new Date(m.updatedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};