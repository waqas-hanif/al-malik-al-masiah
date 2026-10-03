import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import assistantRoutes from "./routes/assistantRoutes.js";

const app = express();

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

// ==================================================
// SECURITY
// ==================================================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// ==================================================
// API RATE LIMIT
// ==================================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// ==================================================
// CORS
// ==================================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://al-malik-al-masiah.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ==================================================
// BODY PARSER
// ==================================================

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

// ==================================================
// ROOT
// ==================================================

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message:
      "AL MALIK AL MASIAH API is running.",
    company:
      "AL MALIK AL MASIAH Trading & Contracting L.L.C",
    version: "1.0.0",
  });
});

// ==================================================
// HEALTH
// ==================================================

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
    environment:
      process.env.NODE_ENV || "development",
  });
});

// ==================================================
// AUTH
// ==================================================

app.use(
  "/api/auth",
  authRoutes
);

// ==================================================
// CONTACT
// ==================================================

app.use(
  "/api/contact",
  contactRoutes
);

// ==================================================
// QUOTES
// ==================================================

app.use(
  "/api/quotes",
  quoteRoutes
);

// ==================================================
// AI ASSISTANT
// ==================================================

app.use(
  "/api/assistant",
  assistantRoutes
);

// ==================================================
// 404
// ==================================================

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// ==================================================
// GLOBAL ERROR HANDLER
// ==================================================

app.use(
  (error, _req, res, _next) => {
    console.error(
      "API Error:",
      error
    );

    if (
      error.name ===
      "ValidationError"
    ) {
      const errors = Object.values(
        error.errors
      ).map(
        (item) => item.message
      );

      return res.status(400).json({
        success: false,
        message:
          "Validation failed.",
        errors,
      });
    }

    if (
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid resource ID.",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A record with this information already exists.",
      });
    }

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Internal server error.",
    });
  }
);

export default app;