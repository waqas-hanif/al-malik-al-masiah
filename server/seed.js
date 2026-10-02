import "dotenv/config";

import bcrypt from "bcryptjs";

import connectDB from "./src/config/db.js";
import Admin from "./src/models/Admin.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@almalikalmasiah.com";
    const adminPassword = "Admin@123456";

    const existingAdmin = await Admin.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("");
      console.log("==========================================");
      console.log(" Admin already exists");
      console.log("==========================================");
      console.log(` Email: ${adminEmail}`);
      console.log("==========================================");
      console.log("");

      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    const admin = await Admin.create({
      name: "AL MALIK AL MASIAH Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("");
    console.log("==========================================");
    console.log(" ADMIN CREATED SUCCESSFULLY");
    console.log("==========================================");
    console.log(` ID: ${admin._id}`);
    console.log(` Name: ${admin.name}`);
    console.log(` Email: ${admin.email}`);
    console.log(` Password: ${adminPassword}`);
    console.log(` Role: ${admin.role}`);
    console.log("==========================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("Admin seed failed:", error.message);
    console.error("");

    process.exit(1);
  }
};

seedAdmin();