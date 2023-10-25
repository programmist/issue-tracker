import { PrismaClient } from "@prisma/client";
import { issues, users } from "./seed-data";

// https://www.prisma.io/docs/guides/migrate/seed-database

const prisma = new PrismaClient();

async function seedDatabase() {
  // Create 5 Users, assigning them 3 Issues each
  users.forEach(async ({ name, email, image }, i) => {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        image,
        assignedIssues: {
          create: issues.slice(i * 3, (i + 1) * 3),
        },
      },
    });
  });

  // Create the remaining 5 unassigned Issues
  await prisma.issue.createMany({ data: issues.slice(15, 20) });

  console.log("Seeded the database with users and issues.");
}

seedDatabase().catch(async (error) => {
  console.error("Error seeding the database:", error);
  await prisma.$disconnect();
  process.exit(1);
});
