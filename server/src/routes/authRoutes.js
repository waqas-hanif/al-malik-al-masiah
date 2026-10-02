import express from "express";

import {
  loginAdmin,
  getCurrentAdmin,
  changeAdminPassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================================================
// PUBLIC
// ==================================================

router.post("/login", loginAdmin);

// ==================================================
// PROTECTED
// ==================================================

router.get(
  "/me",
  protect,
  getCurrentAdmin
);

router.patch(
  "/password",
  protect,
  changeAdminPassword
);

export default router;