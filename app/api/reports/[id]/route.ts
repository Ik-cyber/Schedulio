import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title && !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updatedReport = await prisma.report.update({
      where: { id: params.id },
      data: { title, content },
    });

    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.report.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Report deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 },
    );
  }
}
