import mongoose from "mongoose";
import { z } from "zod";

export const IdSchema = z
  .string({
    required_error: "id is required"
  })
  .refine(
    (val) => {
      return mongoose.Types.ObjectId.isValid(val);
    },
    {
      message: "Invalid id"
    }
  );

export type Id = z.infer<typeof IdSchema>;

export type Pagination = {
  page: number;
  pages: number;
  total: number;
};

export type PaginatedEntity<T> = {
  data: T;
  pagination: Pagination;
};

export type PaginatedDTO<T> = {
  data: T;
  pagination: Pagination;
};

export type ApiResponse<T> = {
  status: "success" | "error" | "failed";
  message: string;
  data: T;
  pagination?: Pagination;
};

// const ObjectId = z
//   .string()
//   .refine((val) => mongoose.Types.ObjectId.isValid(val), {
//     message: "Invalid ObjectId",
//   })
//   .transform((val) => new mongoose.Types.ObjectId(val)); // Convert to ObjectId

// type dd = z.infer<typeof ObjectId>;
