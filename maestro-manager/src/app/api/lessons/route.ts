import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/lessons - Get all lessons
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const studentId = searchParams.get("studentId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build the where clause based on query parameters
    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (studentId) {
      where.studentId = studentId;
    }

    // Date range filtering
    if (startDate || endDate) {
      where.date = {};

      if (startDate) {
        where.date.gte = new Date(startDate);
      }

      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            instrument: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}

// POST /api/lessons - Create a new lesson
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "userId",
      "studentId",
      "date",
      "startTime",
      "endTime",
      "duration",
      "status",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Format date and times if they're strings
    const date =
      typeof body.date === "string" ? new Date(body.date) : body.date;
    const startTime =
      typeof body.startTime === "string"
        ? new Date(body.startTime)
        : body.startTime;
    const endTime =
      typeof body.endTime === "string" ? new Date(body.endTime) : body.endTime;

    const lesson = await prisma.lesson.create({
      data: {
        userId: body.userId,
        studentId: body.studentId,
        date,
        startTime,
        endTime,
        duration: body.duration,
        status: body.status,
        notes: body.notes,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}
