import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Create a new schedule
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cron, reportId, nextRun } = body;

    if (!cron || !reportId || !nextRun) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newSchedule = await prisma.schedule.create({
      data: {
        cron,
        reportId,
        nextRun: new Date(nextRun),
      },
    });

    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// List all schedules
export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      include: { report: true },
    });
    return NextResponse.json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
