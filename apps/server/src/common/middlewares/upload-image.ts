import { Request } from "express";
import multer from "multer";
// import path from "path";

import { AppError } from "@utils/errors";
import { IMAGE_SIZE } from "@assets/constants";

// const uploadPath = path.resolve("./uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads");
  },
  filename: (_req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, `${uniquePrefix}_${file.originalname}`);
  }
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // check if the file is image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload an image.", 404));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: IMAGE_SIZE }
});

export const uploadImage = upload.single("image");

// const uploadImage = upload.array("images", maximumImages);

// const uploadImage = upload.fields([
//   { name: "primaryImage", maxCount: 1 },
//   { name: "images", maxCount: maximumImages }
// ]);
