import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    // const email = body?.email ?? "user@example.com";

    const input = body?.input ?? "default value"; 

    await inngest.send(
      {
        name: "test/hello.world",
        data: { input },
      },
      {
        eventKey: process.env.INNGEST_EVENT_KEY,
      }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending Inngest event:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send event" },
      { status: 500 }
    );
  }
}
