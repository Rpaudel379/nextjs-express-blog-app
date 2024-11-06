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
  console.log(validatedField);

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
    console.log("resp", response);

    if (response.status === "failed") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to create category",
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
  console.log(validatedField);

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to update category",
    };
  }

  try {
    const response = await updateCategory(id, validatedField.data.name);
    console.log("resp", response);

    if (response.status === "failed") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to update category",
      };
    }

    revalidatePath("/dashboard/category");

    return {
      errors: {},
      message: "category updated",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while updating category");
  }
};

export const deleteCategoryAction = async (id: string) => {
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
