import { NextFunction, Request, Response } from "express";
import {
  imageMetadataSchemaDTO,
  ImageMetadataSchemaDTO
} from "@image/image.dto";

import * as ImageMetadataService from "@image/image.service";
import { sendResponse } from "@/common/utils";
import { Messages } from "@/common/assets/constants";
// import { AppError } from "@utils/errors";

export const saveImageMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    const imageMetadataSchema: ImageMetadataSchemaDTO =
      imageMetadataSchemaDTO.parse(file);

    const imageMetadata =
      await ImageMetadataService.createImageMetadata(imageMetadataSchema);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.CREATED.IMAGE_METADATA,
      imageMetadata
    );
  } catch (error) {
    console.log("upload image error", error);
    next(error);
  }
};

export const getAllImagesMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageMetadatas = await ImageMetadataService.findAllImagesMetadata();

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED_ALL.IMAGES_METADATA,
      imageMetadatas
    );
  } catch (error) {
    console.log("images metadata error", error);
    next(error);
  }
};

export const getImageMetadataById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const imageMetadata = await ImageMetadataService.findImageMetadataById(id);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED.IMAGE_METADATA,
      imageMetadata
    );
  } catch (error) {
    console.log("image metadata error", error);
    next(error);
  }
};

export const deleteImageMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const imageMetadata =
      await ImageMetadataService.deleteImageMetadataById(id);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.DELETED.IMAGE_METADATA,
      imageMetadata
    );
  } catch (error) {
    console.log("delete image error", error);
    next(error);
  }
};

// export const updateImageMetadata = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = req.params.id;

//     const files = req.files as {
//       primaryImage: Express.Multer.File[];
//       images?: Express.Multer.File[];
//     };

//     if (!files) {
//       throw new AppError("Must provide atleast one image", 404);
//     }

//   } catch (error) {
//     console.log("update image error", error);
//   }
// };
