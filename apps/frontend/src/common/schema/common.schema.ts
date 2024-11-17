import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const idSchema = z
  .string({
    required_error: "id is required",
  })
  .min(1, "This field is  required")
  .regex(objectIdRegex, { message: "valid Id is required" });

export type Id = z.infer<typeof idSchema>;

export interface WithId {
  id: Id;
}

export type Pagination = {
  page: number;
  pages: number;
  total: number;
};

export type ApiResponse<T> = {
  status: "success" | "error" | "failed";
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  pagination?: Pagination;
};

export type SearchParams = {
  searchParams?: { [key: string]: string | string[] | undefined };
};


// server actions prevState type
// export type ServerActionState<T> = {
//   fields: T;
//   errors: Record<string, string[]>;
//   message: string;
//   success: undefined | boolean;
// };

export type ServerActionState<T> = {
  errors?: Record<string, string[]>;
  message: string;
  success: boolean;
  data?: T;
};
