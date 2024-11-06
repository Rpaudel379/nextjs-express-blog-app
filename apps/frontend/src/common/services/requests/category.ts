import { ApiResponse } from "@/common/schema/common.schema";
import { CategoryType } from "@/common/schema/category.schema";
import { BACKEND_URL } from "@assets/constants/constants";

export const  fetchCategories = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/category`, {
      method: "GET",
      cache: "no-cache",
    });

    const categories: ApiResponse<CategoryType[]> = await response.json();
    return categories;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const createCategory = async (name: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/category`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const createCategory: ApiResponse<CategoryType> = await response.json();

    return createCategory;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const updateCategory = async (id: string, name: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/category/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updateCategory: ApiResponse<CategoryType> = await response.json();

    return updateCategory;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};


export const deleteCategory = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/category/${id}`, {
      method: "DELETE",
    });
  
    const deleteCategory: ApiResponse<CategoryType> = await response.json();

    return deleteCategory;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

