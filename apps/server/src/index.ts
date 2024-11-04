import app from "@/app";
import { connectDB } from "@common/services/db";
import { PORT } from "@common/assets/constants";

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT || 5000}`);
    });
  } catch (error) {
    console.error(`Error starting server: `, error);
  }
})();
