import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

let dbConnectionPromise;

const handler = async (req, res) => {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB();
    }

    await dbConnectionPromise;

    return app(req, res);
  } catch (error) {
    console.error("Server request failed:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default handler;