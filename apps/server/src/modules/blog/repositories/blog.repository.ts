import mongoose from "mongoose";

import Blog, { BlogEntity } from "@blog/models/Blog";
import { BlogSchemaDTO } from "@blog/dto/blog.dto";
import { PaginatedEntity } from "@utils/index";

export const saveBlog = async (
  blogSchema: BlogSchemaDTO
): Promise<BlogEntity | null> => {
  const blog = new Blog(blogSchema);
  await blog.save();

  const populatedBlog = await Blog.findById(blog.id)
    .populate("category")
    .populate("tags")
    .populate("primaryImage")
    .populate("images")
    .exec();

  return populatedBlog;
};

export const findAllBlogs = async (
  page: number,
  pageSize: number
): Promise<PaginatedEntity<BlogEntity[]>> => {
  const skip = (page - 1) * pageSize;

  // const query = {
  //   title: /new blog/i,
  //   category: /sports/i,
  //   tags: { $all: [/football/i, /cricket/i, /tt/i] },
  //   "$or": [
  //     {description: "anything"}
  //   ]
  // };

  const blogs: BlogEntity[] = await Blog.find()
    .populate("category")
    .populate("tags")
    .populate("primaryImage")
    .populate("images")
    .sort({
      updatedAt: -1
    })
    .skip(skip)
    .limit(pageSize);

  // const blogs: BlogEntity[] = await Blog.find()
  //   .populate({ path: "category", match: { name: query["category"] } })
  //   .populate({ path: "tags", match: { name: query["tags"] } })
  //   .populate("primaryImage")
  //   .populate("images")
  //   .sort({
  //     updatedAt: -1
  //   })
  //   .skip(skip)
  //   .limit(pageSize);

  const total = await Blog.countDocuments();
  const pages = Math.ceil(total / pageSize);

  return { data: blogs, pagination: { page, total, pages } };
};

export const findBlogById = async (id: string): Promise<BlogEntity | null> => {
  return await Blog.findById(id)
    .populate("category")
    .populate("tags")
    .populate("primaryImage")
    .populate("images");
};

export const updateBlogById = async (
  id: string,
  blogSchema: BlogSchemaDTO
): Promise<BlogEntity | null> => {
  const blog = await Blog.findById(id);

  // throw new AppError("donee", 404);

  if (!blog) {
    return null;
  }

  blog.title = blogSchema.title || blog.title;
  blog.description = blogSchema.description || blog.description;
  blog.category = new mongoose.Types.ObjectId(blogSchema.category);

  if (blogSchema.tags) {
    blog.tags = blogSchema.tags?.map((tag) => new mongoose.Types.ObjectId(tag));
  } else {
    blog.tags = [];
  }

  blog.primaryImage = new mongoose.Types.ObjectId(blogSchema.primaryImage);

  if (blogSchema.images) {
    blog.images = blogSchema.images.map(
      (image) => new mongoose.Types.ObjectId(image)
    );
  } else {
    blog.images = [];
  }

  await blog.save();

  const populatedBlog = await Blog.findById(blog.id)
    .populate("category")
    .populate("tags")
    .populate("primaryImage")
    .populate("images")
    .exec();

  return populatedBlog;
};

export const deleteBlogById = async (
  id: string
): Promise<BlogEntity | null> => {
  return await Blog.findByIdAndDelete(id)
    .populate("category")
    .populate("tags")
    .populate("primaryImage")
    .populate("images");
};
