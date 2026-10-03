import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

let dbPromise = null;

const connectDatabase = async () => {
  if (!dbPromise) {
    dbPromise = connectDB();
  }

  return dbPromise;
};

/*
 * Vercel Serverless Function
 */
export default async function handler(req, res) {
  try {
    await connectDatabase();

    return app(req, res);
  } catch (error) {
    console.error("Backend request failed:", error);

    return res.status(500).json({
      success: false,
      message: "Backend service temporarily unavailable",
    });
  }
}

/*
 * Local development
 *
 * `node server.js` will start the normal Express server.
 */
if (process.env.NODE_ENV !== "production") {
  connectDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log("");
        console.log("==========================================");
        console.log(" AL MALIK AL MASIAH API");
        console.log("==========================================");
        console.log(` Server: http://localhost:${PORT}`);
        console.log(
          ` Health: http://localhost:${PORT}/api/health`
        );
        console.log(
          ` Environment: ${
            process.env.NODE_ENV || "development"
          }`
        );
        console.log("==========================================");
        console.log("");
      });
    })
    .catch((error) => {
      console.error(
        "Server startup failed:",
        error.message
      );
    });
}