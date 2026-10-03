import "dotenv/config";

import bcrypt from "bcryptjs";

import connectDB from "./src/config/db.js";
import Admin from "./src/models/Admin.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail =
      process.env.ADMIN_EMAIL || "admin@almalikalmasiah.com";

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error(
        "ADMIN_PASSWORD environment variable is not defined"
      );
    }

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
      console.log(" Password: [hidden]");
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
    console.log(` ID: ${admin._id}`);
    console.log(` Name: ${admin.name}`);
    console.log(` Email: ${adminEmail}`);
    console.log(" Password: [hidden]");
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