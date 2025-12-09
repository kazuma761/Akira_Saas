"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import {useTRPC} from "@/trpc/client";
import {useMutation} from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


type Message = {
  id: string;
  content: string;
  role: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState("");

  // Variables for fetching past messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  // const trpc = useTRPC();
  // const invoke =   useMutation(trpc.invoke.mutationOptions({
  //     onSuccess: () =>{
  //         toast.success("Background job started")
  //     }


  // }));

  // Fetch past messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/trigger-hello", {
          method: "GET",
        });

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
  }, []);



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
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (body.project) {
        const projectId = body.project.id;
        toast.success("Project created! Redirecting...");
        router.push(`/projects/${projectId}`);
        return; // stop, no need to continue
      }

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
        <Input value={value} onChange={(e) => setValue(e.target.value)}/>
        {/* <Button disabled={invoke.isPending} onClick={() => invoke.mutate({functionName: "background.job", data: {message: value}})}> */}
        <Button disabled={isPending} onClick={() => handleInvoke(value)}>
          {isPending ? "Starting..." : "Invoke HelloWorld Job"}
        </Button>

        {/*edit below part its sm rando bs from chatgpt*/}
        <div className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold">Past Messages</h2>
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

export default Page;
