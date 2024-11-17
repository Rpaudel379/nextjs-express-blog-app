import app from "@/app";
import { connectDB } from "@common/services/db";
import { PORT } from "@common/assets/constants";
import fs from "fs";

(async () => {
  try {
    // create a upload directory during server startup if not exists
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }

    await connectDB();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT || 5000}`);
    });
  } catch (error) {
    console.error(`Error starting server: `, error);
  }
})();
