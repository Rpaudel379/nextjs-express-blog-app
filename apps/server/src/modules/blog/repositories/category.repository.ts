import Category, { CategoryEntity } from "@blog/models/Category";
import { CategorySchemaDTO } from "@blog/dto/category.dto";

export const saveCategory = async (
  categorySchema: CategorySchemaDTO
): Promise<CategoryEntity> => {
  const category = new Category(categorySchema);
  return await category.save();
};

export const findAllCategories = async (): Promise<CategoryEntity[]> => {
  return await Category.find().sort({
    updatedAt: -1
  });
};

export const findCategoryById = async (
  id: string
): Promise<CategoryEntity | null> => {
  return await Category.findById(id);
};

export const updateCategoryById = async (
  id: string,
  categorySchema: CategorySchemaDTO
): Promise<CategoryEntity | null> => {
  const category = await Category.findById(id);

  if (!category) {
    return null;
  }

  category.name = categorySchema.name;
  await category.save();
  return category;
};

export const deleteCategoryById = async (
  id: string
): Promise<CategoryEntity | null> => {
  return await Category.findByIdAndDelete(id);
};
