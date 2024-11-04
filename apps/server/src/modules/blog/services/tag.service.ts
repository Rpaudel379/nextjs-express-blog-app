import * as TagRepository from "@blog/repositories/tag.repository";
import { tagDTO, TagDTO, TagSchemaDTO } from "@blog/dto/tag.dto";
import { AppError } from "@utils/errors";

export const createTag = async (tagSchema: TagSchemaDTO): Promise<TagDTO> => {
  // call the repository
  const tagEntity = await TagRepository.saveTag(tagSchema);

  // validate outgoing object
  const tag: TagDTO = tagDTO.parse(tagEntity);

  return tag;
};

export const findAllTags = async (): Promise<TagDTO[]> => {
  const tagEntities = await TagRepository.findAllTags();

  // validate outgoing object
  const tag: TagDTO[] = tagEntities.map((tagEntity) => tagDTO.parse(tagEntity));

  return tag;
};

export const findTagById = async (id: string): Promise<TagDTO> => {
  const tagEntity = await TagRepository.findTagById(id);

  if (!tagEntity) {
    throw new AppError("Not Found", 404, {
      id: ["tag not found to display"]
    });
  }

  // validating the outgoing object
  const tag: TagDTO = tagDTO.parse(tagEntity);

  return tag;
};

export const updateTagById = async (
  id: string,
  tagSchema: TagSchemaDTO
): Promise<TagDTO> => {
  // incoming body is validated in middleware with zod

  const tagEntity = await TagRepository.updateTagById(id, tagSchema);

  if (!tagEntity) {
    throw new AppError("Not Found", 404, {
      id: ["tag not found to update"]
    });
  }

  // validating the outgoing object
  const tag: TagDTO = tagDTO.parse(tagEntity);

  return tag;
};

export const deleteTagById = async (id: string): Promise<TagDTO> => {
  const tagEntity = await TagRepository.deleteTagById(id);

  if (!tagEntity) {
    throw new AppError("Not Found", 404, {
      id: ["tag not found to delete"]
    });
  }

  // validate outgoing object
  const tag: TagDTO = tagDTO.parse(tagEntity);

  return tag;
};
