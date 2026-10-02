import express from "express";

import {
  chatAssistant,
  getAssistantActivity,
  assistantHealth,
} from "../controllers/assistantController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================================================
// PUBLIC
// ==================================================

router.get(
  "/health",
  assistantHealth
);

router.post(
  "/chat",
  chatAssistant
);

// ==================================================
// ADMIN
// ==================================================

router.get(
  "/activity",
  protect,
  getAssistantActivity
);

export default router;