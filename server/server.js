import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const isAllowedOrigin = (origin) => {
  if (!origin) return false;

  if (origin === "http://localhost:5173") {
    return true;
  }

  if (origin === "https://al-malik-al-masiah.vercel.app") {
    return true;
  }

  if (
    /^https:\/\/al-malik-al-masiah-[a-z0-9-]+\.vercel\.app$/i.test(
      origin
    )
  ) {
    return true;
  }

  return false;
};

let dbConnectionPromise = null;

const handler = async (req, res) => {
  const origin = req.headers.origin;

  /*
   * Handle CORS preflight BEFORE database connection.
   */
  if (req.method === "OPTIONS") {
    if (isAllowedOrigin(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Max-Age", "86400");

    return res.status(204).end();
  }

  /*
   * CORS headers for normal requests.
   */
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB();
    }

    await dbConnectionPromise;

    return app(req, res);
  } catch (error) {
    console.error("Server request failed:", error);

    if (isAllowedOrigin(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default handler;