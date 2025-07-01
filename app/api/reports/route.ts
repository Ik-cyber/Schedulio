// // app/api/reports/route.ts
// import prisma from "@/lib/db";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
//
// // GET /api/reports - list all reports of current user
// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//
//   const userEmail = session.user?.email;
//   if (!userEmail)
//     return NextResponse.json({ error: "No user email" }, { status: 400 });
//
//   const user = await prisma.user.findUnique({ where: { email: userEmail } });
//   if (!user)
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//
//   const reports = await prisma.report.findMany({ where: { userId: user.id } });
//   return NextResponse.json(reports);
// }
//
// // POST /api/reports - create a new report
// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//
//   const userEmail = session.user?.email;
//   if (!userEmail)
//     return NextResponse.json({ error: "No user email" }, { status: 400 });
//
//   const user = await prisma.user.findUnique({ where: { email: userEmail } });
//   if (!user)
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//
//   const body = await req.json();
//   const { title, content } = body;
//
//   if (!title || !content) {
//     return NextResponse.json(
//       { error: "Missing title or content" },
//       { status: 400 },
//     );
//   }
//
//   const newReport = await prisma.report.create({
//     data: { title, content, userId: user.id },
//   });
//
//   return NextResponse.json(newReport, { status: 201 });
// }

// app/api/reports/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/reports - list all reports
export async function GET() {
  try {
    const reports = await prisma.report.findMany();
    return NextResponse.json(reports);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 },
    );
  }
}

// POST /api/reports - create a new report
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing title or content" },
        { status: 400 },
      );
    }

    // temporarily use dummy userId for now (replace with real later)
    const dummyUserId = "6863ee04fc0be5308c0b7ce9";

    const newReport = await prisma.report.create({
      data: { title, content, userId: dummyUserId },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 },
    );
  }
}
