import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        updatedAt: "desc"
      },
      //optional to show fragment data (see schema in prisma schema file)
      // include:{
      //   fragment: true,
      // }
    });

    return NextResponse.json({ ok: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
        { ok: false, error: "Failed to fetch messages" },
        { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    // const email = body?.email ?? "user@example.com";

    const input = body?.input ?? "default value";

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json(
          { ok: false, error: "Message is required" },
          { status: 400 }
      );
    }

    const createdMessage = await prisma.message.create({
      data: {
        content: input,
        role: "USER",
        type: "RESULT",
      },
    });

    // await inngest.send(
    //   {
    //     name: "test/hello.world",
    //     data: { input },
    //   },
    await inngest.send({
      name: "code-agent/run", // Ensure this matches your Inngest event name
      data: {
        input: input,
      },
    },
      {
        eventKey: process.env.INNGEST_EVENT_KEY,
      }
    );

    return NextResponse.json({ ok: true,  message: createdMessage,});
  } catch (error) {
    console.error("Error sending Inngest event:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send event" },
      { status: 500 }
    );
  }
}
