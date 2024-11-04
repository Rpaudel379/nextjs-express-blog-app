import { Response } from "express";
import { AppError } from "@utils/errors";
import { ERROR, SOMETHING_WENT_WRONG } from "@/common/assets/constants";

export const prodError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors
    });
  } else {
    res.status(500).json({
      status: ERROR,
      message: SOMETHING_WENT_WRONG
    });
  }
};
