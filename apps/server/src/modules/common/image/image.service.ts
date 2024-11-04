import * as ImageMetadataRepository from "@image/image.repository";
import {
  imageMetadataDTO,
  ImageMetadataDTO,
  ImageMetadataSchemaDTO
} from "@image/image.dto";
import { ImageMetadataEntity } from "@image/image.model";
import { AppError } from "@utils/errors";
import { removeImageFromUploads } from "@utils/image/index";

const imageMetadataDTOMapper = (
  imageMetadataEntity: ImageMetadataEntity | null
): ImageMetadataDTO => {
  return imageMetadataDTO.parse(imageMetadataEntity);
};

export const createImageMetadata = async (
  imageMetadataSchema: ImageMetadataSchemaDTO
): Promise<ImageMetadataDTO> => {
  // call the image repository to save the image metadata
  const imageMetadataEntity =
    await ImageMetadataRepository.saveImageMetadata(imageMetadataSchema);

  const imageMetadata: ImageMetadataDTO =
    imageMetadataDTOMapper(imageMetadataEntity);

  return imageMetadata;
};

export const findAllImagesMetadata = async (): Promise<ImageMetadataDTO[]> => {
  const imagesMetadataEntity =
    await ImageMetadataRepository.findAllImagesMetadata();

  // validating the outgoing objects
  const imagesMetadata: ImageMetadataDTO[] = imagesMetadataEntity.map(
    (imageMetadataEntity) => imageMetadataDTOMapper(imageMetadataEntity)
  );

  return imagesMetadata;
};

export const findImageMetadataById = async (
  id: string
): Promise<ImageMetadataDTO> => {
  const imageMetadataEntity =
    await ImageMetadataRepository.findImageMetadatabyId(id);

  if (!imageMetadataEntity) {
    throw new AppError("Not Found", 404, {
      id: ["image metadata not found to display"]
    });
  }

  // validating the outgoint object
  const imageMetadata: ImageMetadataDTO =
    imageMetadataDTOMapper(imageMetadataEntity);

  return imageMetadata;
};

export const deleteImageMetadataById = async (
  id: string
): Promise<ImageMetadataDTO> => {
  const imageMetadataEntity =
    await ImageMetadataRepository.deleteImageMetadataById(id);

  if (!imageMetadataEntity) {
    throw new AppError("Not Found", 404, {
      id: ["image metadata not found to delete"]
    });
  }

  // delete the image from directory as well
  const del = await removeImageFromUploads(imageMetadataEntity.path);
  console.log(del);

  // validating the outgoing object
  const imageMetadata: ImageMetadataDTO =
    imageMetadataDTOMapper(imageMetadataEntity);

  return imageMetadata;
};
