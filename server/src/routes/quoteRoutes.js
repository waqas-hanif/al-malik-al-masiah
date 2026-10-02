import express from "express";

import {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
} from "../controllers/quoteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================================================
// PUBLIC
// ==================================================

// Website quotation request
router.post("/", createQuote);

// ==================================================
// PROTECTED ADMIN ROUTES
// ==================================================

router.get("/", protect, getQuotes);

router.get("/:id", protect, getQuoteById);

router.patch(
  "/:id/status",
  protect,
  updateQuoteStatus
);

router.delete(
  "/:id",
  protect,
  deleteQuote
);

export default router;