import { MulterError } from "multer";
import { NextFunction, Request, Response } from "express";

import { IMAGE_SIZE } from "@assets/constants";
import { AppError } from "@utils/errors";

export const mutlerError = (
  error: MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof MulterError) {
    const message = "image upload error";
    const errors = {
      image: [""]
    };

    if (error.code === "LIMIT_FILE_SIZE") {
      errors.image = [
        `File too large, Maximum file size is ${IMAGE_SIZE / (1024 * 1024)} Mb`
      ];
    } else if (error.code === "LIMIT_UNEXPECTED_FILE") {
      if (error.field === "image") {
        errors.image = ["Please upload only one image"];
      } else errors.image = [`Unknown image field ${error.field}`];
    }

    return next(new AppError(message, 404, errors));
  }

  next(error);
};

// else if (error.code === "LIMIT_UNEXPECTED_FILE") {
//   let message = "";
//   if (error.field === "primaryImage") {
//     message = "only one image can be a primary image";
//   } else if (error.field === "images") {
//     message = `Maximum number of images is ${maximumImages}`;
//   } else message = `Unknown image field ${error.field}`;
//   return next(new AppError(message, 404));
// }
