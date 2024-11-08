"use server";

import { revalidatePath } from "next/cache";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@services/requests/category";
import {
  CategorySchema,
  categorySchema,
  CategoryType,
} from "@/common/schema/category.schema";
import { ServerActionState } from "@/common/schema/common.schema";

export const createCategoryAction = async ({
  name,
}: CategorySchema): Promise<ServerActionState<undefined>> => {
  // server side validation
  const validatedField = categorySchema.safeParse({ name });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to create category",
    };
  }

  // console.log(Object.fromEntries(formdata));

  try {
    const response = await createCategory(validatedField.data.name);

    if (response.status === "failed") {
      return {
        success: false,
        message: "failed to create category",
        errors: response.errors!,
      };
    }

    revalidatePath("/dashboard/category");

    return {
      errors: {},
      message: "category created",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while creating category");
  }
};

export const updateCategoryAction = async ({
  id,
  name,
}: CategoryType): Promise<ServerActionState<undefined>> => {
  const validatedField = categorySchema.safeParse({ name });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to update category",
    };
  }

  try {
    const response = await updateCategory(id, validatedField.data.name);

    if (response.status === "failed" || response.status === "error") {
      return {
        success: false,
        message: "failed to update category",
        errors: response.errors!,
      };
    }

    revalidatePath("/dashboard/category");

    return {
      success: true,
      message: "category updated",
      errors: {},
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while updating category");
  }
};

export const deleteCategoryAction = async (
  id: string
): Promise<ServerActionState<undefined>> => {
  // console.log(Object.fromEntries(formdata));
  try {
    const response = await deleteCategory(id);
    if (response.status === "failed") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to delete category",
      };
    }
    revalidatePath("/dashboard/category");
    return {
      errors: {},
      message: "category deleted",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while deleting category");
  }
};
