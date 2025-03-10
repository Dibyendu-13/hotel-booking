const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(" Seeding database...");

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "user1@example.com" },
      update: {},
      create: {
        email: "user1@example.com",
        password: "$2a$10$5nFP/YMph9j1OjC/mIE02O8NVR7BHz6VclYugQwmH.M2sdHG4L.DW", 
      },
    }),
    prisma.user.upsert({
      where: { email: "user2@example.com" },
      update: {},
      create: {
        email: "user2@example.com",
        password: "$2a$10$5nFP/YMph9j1OjC/mIE02O8NVR7BHz6VclYugQwmH.M2sdHG4L.DW",
      },
    }),
    prisma.user.upsert({
      where: { email: "user3@example.com" },
      update: {},
      create: {
        email: "user3@example.com",
        password: "$2a$10$5nFP/YMph9j1OjC/mIE02O8NVR7BHz6VclYugQwmH.M2sdHG4L.DW",
      },
    }),
  ]);

  
  const hotels = await prisma.hotel.createMany({
    data: [
      { name: "The Grand Hotel", address: "123 Luxury Street, City", roomsAvailable: 10 },
      { name: "Cozy Inn", address: "456 Comfort Road, Town", roomsAvailable: 5 },
      { name: "Sunset Resort", address: "789 Beachside Ave, Coast", roomsAvailable: 8 },
      { name: "Mountain Lodge", address: "101 Summit Path, Hills", roomsAvailable: 7 },
      { name: "Urban Stay", address: "202 Downtown Blvd, Metropolis", roomsAvailable: 15 },
    ],
  });

  console.log(" Seeding completed!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
