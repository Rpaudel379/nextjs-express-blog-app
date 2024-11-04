import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // get only what is defined in the zod schema
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      next();
    } catch (error) {
      // error will be handled in zod error handler middleware and then to global error handler middleware
      next(error);
    }
  };
