// app/api/trpc/invoke/route.ts
import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";      // adjust as needed

export async function POST(req: NextRequest) {
  const body = await req.json();

  // body: { functionName: "background.job", data: { message: "Mota mata" } }
  const { functionName, data } = body;

  // send an Inngest event
  await inngest.send({
    name: functionName, // e.g. "background.job"
    data: data ?? {},
  });

  return NextResponse.json({ ok: true });
}
