import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "@utils/errors";

export const zodError = (
  error: ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const message = "schema validation error";
    const errors = error.flatten().fieldErrors;

    return next(new AppError(message, 400, errors));
  }

  next(error);
};
