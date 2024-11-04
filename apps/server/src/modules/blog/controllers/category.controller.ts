import { NextFunction, Request, Response } from "express";
import * as CategoryService from "@blog/services/category.service";
import { sendResponse } from "@/common/utils";
import { Messages } from "@/common/assets/constants";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // go to services
    const category = await CategoryService.createCategory(req.body);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.CREATED.CATEGORY,
      category
    );
  } catch (error) {
    // console.log("create category errorr", error);
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryService.findAllCategories();

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED_ALL.CATEGORIES,
      categories
    );
  } catch (error) {
    console.log("categories error", error);
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const category = await CategoryService.findCategoryById(id);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED.CATEGORY,
      category
    );
  } catch (error) {
    console.log("single category error", error);
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => { 
  try {
    const id = req.params.id;
    const category = await CategoryService.updateCategoryById(id, req.body);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.UPDATED.CATEGORY,
      category
    );
  } catch (error) {
    console.log("update category errorr", error);
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const category = await CategoryService.deleteCategoryById(id);

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.DELETED.CATEGORY,
      category
    );
  } catch (error) {
    console.log("delete errorr", error);
    next(error);
  }
};
