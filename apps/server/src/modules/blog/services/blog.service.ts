import { BlogDTO, BlogSchemaDTO, blogDTO } from "@blog/dto/blog.dto";
import * as BlogRepository from "@blog/repositories/blog.repository";
import { BlogEntity } from "@blog/models/Blog";

import { AppError } from "@utils/errors";
import { PaginatedDTO } from "@utils/index";

const blogDTOMapper = (blogEntity: BlogEntity | null): BlogDTO => {
  return blogDTO.parse(blogEntity);
};

export const createBlog = async (
  blogSchema: BlogSchemaDTO
): Promise<BlogDTO> => {
  // incoming body is validated in middleware with zod

  // call the repository
  const blogEntity = await BlogRepository.saveBlog(blogSchema);

  // validate outgoing object with DTO mapper
  const blog: BlogDTO = blogDTOMapper(blogEntity);

  return blog;
};

export const findAllBlogs = async (
  page: number,
  pageSize: number
): Promise<PaginatedDTO<BlogDTO[]>> => {
  const paginatedBlogEntities = await BlogRepository.findAllBlogs(
    page,
    pageSize
  );

  // validating the outgoing objects
  const blogs: BlogDTO[] = paginatedBlogEntities.data.map((blogEntity) =>
    blogDTOMapper(blogEntity)
  );

  return {
    data: blogs,
    pagination: paginatedBlogEntities.pagination
  };
};

export const findBlogById = async (id: string): Promise<BlogDTO> => {
  const blogEntity = await BlogRepository.findBlogById(id);

  if (!blogEntity) {
    throw new AppError("not found", 404, {
      id: ["blog not found to display"]
    });
  }

  // validating the outgoing object
  const blog: BlogDTO = blogDTOMapper(blogEntity);

  return blog;
};

export const updateBlogById = async (
  id: string,
  blogSchema: BlogSchemaDTO
): Promise<BlogDTO> => {
  // incoming body is validated in middleware with zod

  const blogEntity = await BlogRepository.updateBlogById(id, blogSchema);

  if (!blogEntity) {
    throw new AppError("not found", 404, {
      id: ["blog not found to update"]
    });
  }

  // validating the outgoing object
  const blog: BlogDTO = blogDTOMapper(blogEntity);
  return blog;
};

export const deleteBlogById = async (id: string): Promise<BlogDTO> => {
  const blogEntity = await BlogRepository.deleteBlogById(id);
  if (!blogEntity) {
    throw new AppError("not found", 404, {
      id: ["blog not found to delete"]
    });
  }

  // validate outgoing object
  const blog: BlogDTO = blogDTOMapper(blogEntity);

  return blog;
};
