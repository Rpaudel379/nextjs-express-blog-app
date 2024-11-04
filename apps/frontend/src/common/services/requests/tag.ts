import { ApiResponse } from "@/common/schema/common.schema";
import { TagType } from "@/common/schema/tags.schema";
import { BACKEND_URL } from "@assets/constants/constants";

export const fetchTags = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/tags`, {
      method: "GET",
      cache: "no-cache",
    });

    const tags: ApiResponse<TagType[]> = await response.json();
    return tags;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const createTag = async (name: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/tags`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const createTag: ApiResponse<TagType> = await response.json();

    return createTag;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const updateTag = async (id: string, name: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/tags/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updateTag: ApiResponse<TagType> = await response.json();

    return updateTag;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const deleteTag = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/tags/${id}`, {
      method: "DELETE",
    });

    const deleteTag: ApiResponse<TagType> = await response.json();

    return deleteTag;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};
