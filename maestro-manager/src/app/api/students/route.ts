import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/students - Get all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        lastName: "asc",
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST /api/students - Create a new student
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "instrument",
      "level",
      "status",
      "userId",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Format startDate if it's a string
    if (typeof body.startDate === "string") {
      body.startDate = new Date(body.startDate);
    }

    const student = await prisma.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        instrument: body.instrument,
        level: body.level,
        startDate: body.startDate || new Date(),
        status: body.status,
        notes: body.notes,
        parentName: body.parentName,
        parentEmail: body.parentEmail,
        parentPhone: body.parentPhone,
        userId: body.userId,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
