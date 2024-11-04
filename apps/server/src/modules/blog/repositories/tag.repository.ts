import { TagSchemaDTO } from "@blog/dto/tag.dto";
import Tag, { TagEntity } from "@blog/models/Tag";

export const saveTag = async (tagSchema: TagSchemaDTO): Promise<TagEntity> => {
  const tag = new Tag(tagSchema);

  return await tag.save();
};

export const findAllTags = async (): Promise<TagEntity[]> => {
  return await Tag.find().sort({
    updatedAt: -1
  });
};

export const findTagById = async (id: string): Promise<TagEntity | null> => {
  return await Tag.findById(id);
};

export const updateTagById = async (
  id: string,
  tagSchema: TagSchemaDTO
): Promise<TagEntity | null> => {
  const tag = await Tag.findById(id);

  if (!tag) {
    return null;
  }

  tag.name = tagSchema.name;
  await tag.save();
  return tag;
};

export const deleteTagById = async (id: string): Promise<TagEntity | null> => {
  return await Tag.findByIdAndDelete(id);
};
