import { z } from "zod";

export const idSchema = z.string({
  required_error: "id is required",
});

// z.string().regex(/^[0-9a-f]{24}$/);

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

// server actions prevState type
// export type ServerActionState<T> = {
//   fields: T;
//   errors: Record<string, string[]>;
//   message: string;
//   success: undefined | boolean;
// };

export type ServerActionState<T> = {
  errors: Record<string, string[]>;
  message: string;
  success: boolean;
  data?: T;
};
