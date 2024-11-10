"use server";

import { blogSchema, BlogSchema, BlogType } from "@/common/schema/blog.schema";
import { ServerActionState } from "@/common/schema/common.schema";
import { createBlog, deleteBlog, updateBlog } from "@services/requests/blogs";
import { revalidatePath } from "next/cache";

export const createBlogAction = async (
  blog: BlogSchema
): Promise<ServerActionState<BlogType>> => {
  // server side validation

  const validatedField = blogSchema.safeParse(blog);

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to create blog",
    };
  }

  try {
    const response = await createBlog(validatedField.data);

    if (response.status === "failed" || response.status === "error") {
      return {
        success: false,
        message: "failed to create blog",
        errors: response.errors!,
      };
    }

    return {
      success: true,
      message: "blog created",
      data: response.data,
      errors: {},
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while creating category");
  }
};

export const updateBlogAction = async (
  id: string,
  blog: BlogSchema
): Promise<ServerActionState<BlogType>> => {
  // server side validation

  const validatedField = blogSchema.safeParse(blog);

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      success: false,
      message: "failed to update blog",
    };
  }

  try {
    const response = await updateBlog(id, validatedField.data);

    if (response.status === "failed" || response.status === "error") {
      return {
        success: false,
        message: "failed to update blog",
        errors: response.errors!,
      };
    }

    return {
      success: true,
      message: "blog updated",
      data: response.data,
      errors: {},
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while creating category");
  }
};

export const deleteBlogAction = async (
  id: string
): Promise<ServerActionState<undefined>> => {
  try {
    const response = await deleteBlog(id);
    if (response.status === "failed" || response.status === "error") {
      return {
        errors: response.errors!,
        success: false,
        message: "failed to delete blog",
      };
    }
    revalidatePath("/dashboard/blogs");
    return {
      errors: {},
      message: "blog deleted",
      success: true,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while deleting blog");
  }
};
