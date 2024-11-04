import { BACKEND_URL } from "@/common/assets/constants/constants";
import { ApiError } from "@/common/utils/errors/api-error";
import { BlogType } from "@/common/schema/blog.schema";
import { ApiResponse } from "@/common/schema/common.schema";
import { notFound } from "next/navigation";

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs`, {
      method: "GET",
      cache: "no-cache",
      // next: {
      //   revalidate: 10000,
      // },
    });

    const blogs: ApiResponse<BlogType[]> = await response.json();

    return blogs;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/blogs/blog/${id}`, {
      method: "GET",
      cache: "no-cache",
    });

    const blog: ApiResponse<BlogType> = await response.json();

    if (!response.ok) {
      throw new ApiError(blog.message, blog.status, response.status);
    }

    return blog;
  } catch (error) {
    // caught error
    if (error instanceof ApiError) {
      console.log("error console");
      console.dir(error, { depth: null });
      if (error.statusCode == 404) {
        notFound();
      }
    }
    // uncaught error
    throw new Error("Oops, Something went wrong! Please try again");
  }
};
