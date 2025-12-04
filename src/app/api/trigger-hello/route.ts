import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { generateSlug } from "random-word-slugs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    const messages = await prisma.message.findMany({
      where: projectId ? { projectId } : undefined,
      orderBy: {
        updatedAt: "desc",
      },
      // optional: include fragment, etc.
      // include: { fragment: true },
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
    const projectId: string | undefined = body?.projectId;

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json(
          { ok: false, error: "Message is required" },
          { status: 400 }
      );
    }

    // 🔹 CASE 1: existing project → behave like messagesRouter.create
    if (projectId) {
      const createdMessage = await prisma.message.create({
        data: {
          projectId: projectId,
          content: input,
          role: "USER",
          type: "RESULT",
        },
      });

      await inngest.send(
          {
            name: "code-agent/run",
            data: {
              input: input,
              projectId: projectId,
            },
          },
          {
            eventKey: process.env.INNGEST_EVENT_KEY,
          }
      );

      return NextResponse.json({
        ok: true,
        message: createdMessage,
      });
    }

    // 🔹 CASE 2: no projectId → behave like projectsRouter.create
    const createdProject = await prisma.project.create({
      data: {
        name: generateSlug(2, {
          format: "kebab",
        }),
        messages: {
          create: {
            content: input,
            role: "USER",
            type: "RESULT",
          },
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
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
        projectId: createdProject.id,
      },
    },
      {
        eventKey: process.env.INNGEST_EVENT_KEY,
      }
    );

    return NextResponse.json({
      ok: true,
      project: createdProject,
    });
  } catch (error) {
    console.error("Error sending Inngest event:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send event" },
      { status: 500 }
    );
  }
}
