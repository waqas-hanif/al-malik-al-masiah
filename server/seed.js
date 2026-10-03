import "dotenv/config";

import bcrypt from "bcryptjs";

import connectDB from "./src/config/db.js";
import Admin from "./src/models/Admin.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@almalikalmasiah.com";
    const adminPassword = "Admin@123456";

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    const existingAdmin = await Admin.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.name = "AL MALIK AL MASIAH Admin";
      existingAdmin.role = "admin";
      existingAdmin.isActive = true;

      await existingAdmin.save();

      console.log("");
      console.log("==========================================");
      console.log(" ADMIN PASSWORD RESET SUCCESSFULLY");
      console.log("==========================================");
      console.log(` Email: ${adminEmail}`);
      console.log(` Password: ${adminPassword}`);
      console.log("==========================================");
      console.log("");

      process.exit(0);
    }

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
    console.log(` Email: ${adminEmail}`);
    console.log(` Password: ${adminPassword}`);
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