import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Get single schedule
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: params.id },
      include: { report: true },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Delete schedule
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.schedule.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Schedule deleted" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
