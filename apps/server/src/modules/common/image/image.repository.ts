import { ImageMetadataSchemaDTO } from "@image/image.dto";
import ImageMetadata, { ImageMetadataEntity } from "@image/image.model";

export const saveImageMetadata = async (
  imageMetadataSchema: ImageMetadataSchemaDTO
): Promise<ImageMetadataEntity> => {
  const imageMetadata = new ImageMetadata(imageMetadataSchema);
  return await imageMetadata.save();
};

export const findAllImagesMetadata = async (): Promise<
  ImageMetadataEntity[]
> => {
  return await ImageMetadata.find().sort({ updatedAt: -1 });
};

export const findImageMetadatabyId = async (
  id: string
): Promise<ImageMetadataEntity | null> => {
  return await ImageMetadata.findById(id);
};

export const deleteImageMetadataById = async (
  id: string
): Promise<ImageMetadataEntity | null> => {
  return await ImageMetadata.findByIdAndDelete(id);
};

// export const updateImageMetadataById = async (
//   id: string,
//   imageMetadataSchema: ImageMetadataSchemaDTO
// ): Promise<ImageMetadataEntity | null> => {
//   const imageMetadata = await ImageMetadata.findById(id);

//   if (!imageMetadata) {
//     return null;
//   }

//   imageMetadata.originalname = imageMetadataSchema.originalname;
//   imageMetadata.encoding = imageMetadataSchema.encoding;
//   imageMetadata.mimetype = imageMetadataSchema.mimetype;
//   imageMetadata.destination = imageMetadataSchema.destination;
//   imageMetadata.filename = imageMetadataSchema.filename;
//   imageMetadata.path = imageMetadataSchema.path;
//   imageMetadata.size = imageMetadataSchema.size;

//   return await imageMetadata.save()
// };
