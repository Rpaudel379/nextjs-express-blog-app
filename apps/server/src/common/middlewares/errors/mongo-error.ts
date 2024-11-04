/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

import { AppError } from "@utils/errors";

export const mongoError = (
  error: MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = "database validation failed";

  // error.name === "ValidationError"
  if (error instanceof MongooseError.ValidationError) {
    console.log("MONGOO VALIDATION ERROR");

    const errors: { [key: string]: string[] } = {};

    Object.values(error.errors).map((error: any) => {
      errors[error.path] = [error.message];
    });

    return next(new AppError(message, 400, errors));
  }

  // error.name === 'CastError'
  if (error instanceof MongooseError.CastError) {
    console.log("MONGOO CAST ERROR");

    const errors = {
      [error.path]: ["invalid type"]
    };

    return next(new AppError(message, 404, errors));
  }

  // duplicate error

  if ((error as any).code === 11000) {
    console.log("mongoo duplicate error");
    const KV = (error as any).keyValue;

    const errors: {
      [key: string]: string[];
    } = {};

    Object.entries(KV).forEach(([key, value]) => {
      errors[key] = [`${value} already exists`];
    });

    return next(new AppError(message, 400, errors));
  }

  next(error);
};
