import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/students/[id] - Get a student by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: params.id,
      },
      include: {
        lessons: {
          orderBy: {
            date: "desc",
          },
          take: 5,
        },
        payments: {
          orderBy: {
            date: "desc",
          },
          take: 5,
        },
        progress: {
          orderBy: {
            date: "desc",
          },
          take: 5,
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// PUT /api/students/[id] - Update a student
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Format startDate if it's a string
    if (typeof body.startDate === "string") {
      body.startDate = new Date(body.startDate);
    }

    const student = await prisma.student.update({
      where: {
        id: params.id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        instrument: body.instrument,
        level: body.level,
        startDate: body.startDate,
        status: body.status,
        notes: body.notes,
        parentName: body.parentName,
        parentEmail: body.parentEmail,
        parentPhone: body.parentPhone,
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

// DELETE /api/students/[id] - Delete a student
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.student.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
