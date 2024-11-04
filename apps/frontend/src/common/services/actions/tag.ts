"use server";

import { revalidatePath } from "next/cache";

import { ServerActionState } from "@/common/schema/common.schema";
import { tagSchema, TagSchema, TagType } from "@/common/schema/tags.schema";
import { createTag, deleteTag, updateTag } from "@services/requests/tag";

export const createTagAction = async ({
  name,
}: TagSchema): Promise<ServerActionState> => {
  // server side validation
  const validatedField = tagSchema.safeParse({ name });
  console.log(validatedField);

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to create tag",
    };
  }

  // console.log(Object.fromEntries(formdata));

  try {
    const response = await createTag(validatedField.data.name);
    console.log("resp", response);

    if (response.status === "failed") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to create category",
      };
    }

    revalidatePath("/dashboard/tags");

    return {
      errors: {},
      message: "tag created",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while creating tag");
  }
};

export const updateTagAction = async ({
  id,
  name,
}: TagType): Promise<ServerActionState> => {
  const validatedField = tagSchema.safeParse({ name });
  console.log(validatedField);

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to update tag",
    };
  }

  try {
    const response = await updateTag(id, validatedField.data.name);
    console.log("resp", response);

    if (response.status === "failed") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to update tag",
      };
    }

    revalidatePath("/dashboard/tags");

    return {
      errors: {},
      message: "tag updated",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while updating tag");
  }
};

export const deleteTagAction = async (id: string) => {
  // console.log(Object.fromEntries(formdata));
  try {
    const response = await deleteTag(id);
    if (response.status === "failed") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to delete tag",
      };
    }
    revalidatePath("/dashboard/category");
    return {
      errors: {},
      message: "tag deleted",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while deleting tag");
  }
};
