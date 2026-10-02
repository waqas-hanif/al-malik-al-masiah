import express from "express";

import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================================================
// PUBLIC
// ==================================================

// Website contact form
router.post("/", createContact);

// ==================================================
// PROTECTED ADMIN ROUTES
// ==================================================

router.get("/", protect, getContacts);

router.get("/:id", protect, getContactById);

router.patch(
  "/:id/status",
  protect,
  updateContactStatus
);

router.delete(
  "/:id",
  protect,
  deleteContact
);

export default router;