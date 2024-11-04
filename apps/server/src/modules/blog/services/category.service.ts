import * as CategoryRepository from "@blog/repositories/category.repository";

import {
  categoryDTO,
  CategoryDTO,
  CategorySchemaDTO
} from "@blog/dto/category.dto";
import { AppError } from "@utils/errors";

export const createCategory = async (
  categorySchema: CategorySchemaDTO
): Promise<CategoryDTO> => {
  // incoming body is validated in middleware with zod

  // call the repository
  const categoryEntity = await CategoryRepository.saveCategory(categorySchema);

  // validate outgoing object
  const category: CategoryDTO = categoryDTO.parse(categoryEntity);

  return category;
};

export const findAllCategories = async (): Promise<CategoryDTO[]> => {
  const categoryEntities = await CategoryRepository.findAllCategories();

  // validating the outgoing object
  const category: CategoryDTO[] = categoryEntities.map((categoryEntity) =>
    categoryDTO.parse(categoryEntity)
  );

  return category;
};

export const findCategoryById = async (id: string): Promise<CategoryDTO> => {
  const categoryEntity = await CategoryRepository.findCategoryById(id);

  if (!categoryEntity) {
    throw new AppError("Not Found", 404, {
      id: ["category not found to display"]
    });
  }

  // validating the outgoing object
  const category: CategoryDTO = categoryDTO.parse(categoryEntity);

  return category;
};

export const updateCategoryById = async (
  id: string,
  categorySchema: CategorySchemaDTO
): Promise<CategoryDTO> => {
  // incoming body is validated in middleware with zod

  const categoryEntity = await CategoryRepository.updateCategoryById(
    id,
    categorySchema
  );

  if (!categoryEntity) {
    throw new AppError("Not Found", 404, {
      id: ["category not found to update"]
    });
  }

  // validating the outgoing object
  const category: CategoryDTO = categoryDTO.parse(categoryEntity);

  return category;
};

export const deleteCategoryById = async (id: string): Promise<CategoryDTO> => {
  const categoryEntity = await CategoryRepository.deleteCategoryById(id);

  if (!categoryEntity) {
    throw new AppError("Not Found", 404, {
      id: ["category not found to delete"]
    });
  }

  // validate outgoing object
  const category: CategoryDTO = categoryDTO.parse(categoryEntity);

  return category;
};
