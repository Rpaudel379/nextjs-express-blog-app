import { z } from "zod";
import { idSchema } from "@schema/common.schema";

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

export type ServerActionState<T> = {
  errors: Record<string, string[]>;
  message: string;
  success: boolean;
  data?: T;
};

// server actions prevState type
// export type ServerActionState<T> = {
//   fields: T;
//   errors: Record<string, string[]>;
//   message: string;
//   success: undefined | boolean;
// };
