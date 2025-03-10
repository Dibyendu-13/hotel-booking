require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.json({ userId: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "User already exists!" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/hotels", async (req, res) => {
  try {
    const hotels = await prisma.hotel.findMany();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

app.post("/api/booking", async (req, res) => {
  const { userId, hotelId, checkInDate, checkOutDate, familyMembers } = req.body;

  if (!userId || !hotelId || !checkInDate || !checkOutDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!Array.isArray(familyMembers) || familyMembers.length === 0) {
    return res.status(400).json({ error: "At least one family member is required" });
  }

  try {
    for (let member of familyMembers) {
      const existingMember = await prisma.familyMember.findUnique({
        where: { aadhaar: member.aadhaar },
      });

      if (existingMember) {
        return res.status(400).json({ error: `Aadhaar ${member.aadhaar} already exists!` });
      }
    }

    const booking = await prisma.booking.create({
      data: {
        user: { connect: { id: userId } },
        hotel: { connect: { id: parseInt(hotelId) } },
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        familyMembers: {
          create: familyMembers.map(member => ({
            name: member.name,
            aadhaar: member.aadhaar,
          })),
        },
      },
      include: { familyMembers: true },
    });

    res.status(200).json({ message: "Booking confirmed!", booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to save booking" });
  }
});

app.post("/api/family", async (req, res) => {
  try {
    const { bookingId, name, aadhaar } = req.body;

    const member = await prisma.familyMember.create({
      data: { bookingId, name, aadhaar },
    });

    res.json({ message: "Family member added", id: member.id });
  } catch (error) {
    res.status(400).json({ error: "Aadhaar already exists!" });
  }
});

app.delete("/api/family/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.familyMember.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Family member deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete family member" });
  }
});

app.post("/api/checkin", async (req, res) => {
  try {
    const { bookingId } = req.body;
    const members = await prisma.familyMember.findMany({ where: { bookingId } });

    if (members.length === 0) {
      return res.status(400).json({ message: "No family members added" });
    }

    res.json({ message: "Check-in successful", family: members });
  } catch (error) {
    res.status(500).json({ error: "Check-in failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
