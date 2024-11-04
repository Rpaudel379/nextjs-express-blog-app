import { Router } from "express";
import * as ImageController from "@image/image.controller";
import { uploadImage } from "@middlewares/upload-image";

const router = Router();
// route http://localhost:5000/api/v1/image/

router.post("/", uploadImage, ImageController.saveImageMetadata);
router.get("/", ImageController.getAllImagesMetadata);
router.get("/:id", ImageController.getImageMetadataById);
router.delete("/:id", ImageController.deleteImageMetadata);

export default router;
