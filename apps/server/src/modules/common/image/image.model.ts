import mongoose, { Document } from "mongoose";
import { ImageMetadataSchemaDTO } from "@image/image.dto";

export interface ImageMetadataEntity extends ImageMetadataSchemaDTO, Document {}

const imageMetadataSchema = new mongoose.Schema<ImageMetadataEntity>(
  {
    originalname: {
      type: String,
      required: true
    },
    encoding: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const ImageMetadata = mongoose.model<ImageMetadataEntity>(
  "ImageMetadata",
  imageMetadataSchema
);

export default ImageMetadata;
