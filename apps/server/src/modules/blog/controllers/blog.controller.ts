import { NextFunction, Request, Response } from "express";

import * as BlogService from "@blog/services/blog.service";
import { Messages, PAGE, PAGE_SIZE } from "@assets/constants";
import { sendResponse } from "@utils/index";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await BlogService.createBlog(req.body);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.CREATED.BLOG,
      blog
    );
  } catch (error) {
    console.log("create errorr", error);
    next(error);
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.query.page, req.query.pageSize);
    console.log("dao", req.query);
    const page = parseInt(req.query.page as string) || PAGE;
    const pageSize = parseInt(req.query.limit as string) || PAGE_SIZE;

    const blogs = await BlogService.findAllBlogs(page, pageSize);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED_ALL.BLOGS,
      blogs.data,
      blogs.pagination
    );
  } catch (error) {
    console.log("blogs error", error);
    next(error);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const blogs = await BlogService.findBlogById(id);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED.BLOG,
      blogs
    );
  } catch (error) {
    console.log("blog error", error);
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const blog = await BlogService.updateBlogById(id, req.body);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.UPDATED.BLOG,
      blog
    );
  } catch (error) {
    console.log("update errorr", error);
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const blog = await BlogService.deleteBlogById(id);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.DELETED.BLOG,
      blog
    );
  } catch (error) {
    console.log("delete errorr", error);
    next(error);
  }
};
