import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Seeding database...");

    // Create a demo user
    const hashedPassword = await hash("password123", 10);
    const user = await prisma.user.upsert({
      where: { email: "demo@example.com" },
      update: {},
      create: {
        name: "Demo Teacher",
        email: "demo@example.com",
        password: hashedPassword,
        businessName: "Harmony Music Studio",
        address: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94107",
        phone: "(555) 123-4567",
        bio: "Professional music teacher with over 10 years of experience teaching piano and guitar to students of all ages.",
        defaultLessonDuration: 45,
        defaultHourlyRate: 60,
        settings: {
          create: {
            emailReminders: true,
            paymentNotifications: true,
            theme: "light",
          },
        },
      },
    });

    console.log("Created demo user:", user.email);

    // Create demo students
    const students = [
      {
        firstName: "Emma",
        lastName: "Johnson",
        email: "emma.j@example.com",
        phone: "(555) 123-4567",
        instrument: "Piano",
        level: "Intermediate",
        startDate: new Date("2024-01-15"),
        status: "Active",
        userId: user.id,
      },
      {
        firstName: "Noah",
        lastName: "Williams",
        email: "noah.w@example.com",
        phone: "(555) 234-5678",
        instrument: "Guitar",
        level: "Beginner",
        startDate: new Date("2024-02-03"),
        status: "Active",
        userId: user.id,
      },
      {
        firstName: "Olivia",
        lastName: "Brown",
        email: "olivia.b@example.com",
        phone: "(555) 345-6789",
        instrument: "Violin",
        level: "Advanced",
        startDate: new Date("2023-11-10"),
        status: "Active",
        userId: user.id,
      },
      {
        firstName: "Liam",
        lastName: "Davis",
        email: "liam.d@example.com",
        phone: "(555) 456-7890",
        instrument: "Drums",
        level: "Intermediate",
        startDate: new Date("2024-03-22"),
        status: "Active",
        userId: user.id,
      },
      {
        firstName: "Ava",
        lastName: "Miller",
        email: "ava.m@example.com",
        phone: "(555) 567-8901",
        instrument: "Voice",
        level: "Beginner",
        startDate: new Date("2024-04-05"),
        status: "Inactive",
        userId: user.id,
      },
    ];

    for (const studentData of students) {
      const student = await prisma.student.upsert({
        where: {
          email_userId: {
            email: studentData.email || "",
            userId: studentData.userId,
          },
        },
        update: {},
        create: studentData,
      });
      console.log("Created student:", student.firstName, student.lastName);
    }

    // Create demo lessons
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    // Get all students
    const allStudents = await prisma.student.findMany({
      where: { userId: user.id },
    });

    // Create lessons for each student
    for (let i = 0; i < allStudents.length; i++) {
      const student = allStudents[i];
      const lessonDate = new Date(today);
      lessonDate.setDate(lessonDate.getDate() + i);

      // Set lesson time (3:30 PM, 4:30 PM, etc.)
      lessonDate.setHours(15 + i, 30, 0, 0);

      const endTime = new Date(lessonDate);
      endTime.setMinutes(endTime.getMinutes() + 45);

      const lesson = await prisma.lesson.create({
        data: {
          userId: user.id,
          studentId: student.id,
          date: lessonDate,
          startTime: lessonDate,
          endTime: endTime,
          duration: 45,
          status: "Scheduled",
          notes: `Regular ${student.instrument} lesson`,
        },
      });

      console.log(
        "Created lesson for:",
        student.firstName,
        student.lastName,
        "on",
        lessonDate.toLocaleString()
      );
    }

    // Create demo payments
    for (let i = 0; i < allStudents.length; i++) {
      const student = allStudents[i];
      const paymentDate = new Date(today);
      paymentDate.setDate(paymentDate.getDate() - i * 2);

      const payment = await prisma.payment.create({
        data: {
          userId: user.id,
          studentId: student.id,
          amount: 240,
          date: paymentDate,
          method: ["Credit Card", "Bank Transfer", "PayPal", "Cash"][i % 4],
          status: "Paid",
          description: `${student.instrument} lessons - Monthly (4 sessions)`,
        },
      });

      console.log(
        "Created payment for:",
        student.firstName,
        student.lastName,
        "on",
        paymentDate.toLocaleString()
      );
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
