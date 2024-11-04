import { Router } from "express";
import blogRoutes from "@blog/blog.routes";
import imageRoutes from "@image/image.routes"

const router = Router();

// blog routes
router.use("/blogs", blogRoutes);
router.use("/image", imageRoutes)

export default router;
