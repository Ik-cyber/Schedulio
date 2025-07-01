import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/attachments
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, fileUrl, mimeType, size, reportId } = body;

    if (!fileName || !fileUrl || !mimeType || !size || !reportId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newAttachment = await prisma.attachment.create({
      data: {
        fileName,
        fileUrl,
        mimeType,
        size,
        reportId,
      },
    });

    return NextResponse.json(newAttachment, { status: 201 });
  } catch (error) {
    console.error("Error creating attachment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
