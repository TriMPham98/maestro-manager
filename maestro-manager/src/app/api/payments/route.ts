import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/payments - Get all payments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const studentId = searchParams.get("studentId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");

    // Build the where clause based on query parameters
    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (studentId) {
      where.studentId = studentId;
    }

    if (status) {
      where.status = status;
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

    const payments = await prisma.payment.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        lesson: {
          select: {
            id: true,
            date: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "userId",
      "studentId",
      "amount",
      "date",
      "method",
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

    // Format date if it's a string
    const date =
      typeof body.date === "string" ? new Date(body.date) : body.date;

    const payment = await prisma.payment.create({
      data: {
        userId: body.userId,
        studentId: body.studentId,
        lessonId: body.lessonId,
        amount: body.amount,
        date,
        method: body.method,
        status: body.status,
        description: body.description,
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
