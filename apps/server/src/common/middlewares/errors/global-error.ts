import { NextFunction, Request, Response } from "express";
import { ERROR, NODE_ENV, SOMETHING_WENT_WRONG } from "@assets/constants";
import { AppError, devError, prodError } from "@utils/errors";

export const globalError = (
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  // console.log(err.message);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || ERROR;
  err.message = err.message || SOMETHING_WENT_WRONG;

  if (NODE_ENV === "development") {
    devError(err, res);
  } else if (NODE_ENV === "production") {
    prodError(err, res);
  }
};
