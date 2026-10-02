import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

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
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );
    process.exit(1);
  }
};

startServer();