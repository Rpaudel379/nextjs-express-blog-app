import { NextFunction, Request, Response } from "express";
import * as TagService from "@blog/services/tag.service";
import { sendResponse } from "@/common/utils";
import { Messages } from "@/common/assets/constants";

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await TagService.createTag(req.body);

    sendResponse(res, 200, Messages.STATUS.SUCCESS, Messages.CREATED.TAG, tag);
  } catch (error) {
    console.log("create tag error", error);
    next(error);
  }
};

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await TagService.findAllTags();

    sendResponse(
      res,
      200,
      Messages.STATUS.SUCCESS,
      Messages.FETCHED_ALL.TAGS,
      tags
    );
  } catch (error) {
    console.log("tags error", error);
    next(error);
  }
};

export const getTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const tag = await TagService.findTagById(id);
    sendResponse(res, 200, Messages.STATUS.SUCCESS, Messages.FETCHED.TAG, tag);
  } catch (error) {
    console.log("single tag error", error);
    next(error);
  }
};

export const updateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const tag = await TagService.updateTagById(id, req.body);

    sendResponse(res, 200, Messages.STATUS.SUCCESS, Messages.UPDATED.TAG, tag);
  } catch (error) {
    console.log("update tag errorr", error);
    next(error);
  }
};

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const tag = await TagService.deleteTagById(id);

    sendResponse(res, 200, Messages.STATUS.SUCCESS, Messages.DELETED.TAG, tag);
  } catch (error) {
    console.log("delete tag errorr", error);
    next(error);
  }
};
