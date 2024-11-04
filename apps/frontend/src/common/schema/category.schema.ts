import { z } from "zod";
import { Id, ServerActionState } from "@common/schema/common.schema";

export const categorySchema = z.object({
  name: z
    .string({
      required_error: "category is required",
    })
    .min(3, "category length must be aleast 3 chars")
    .max(20, "category length must be atmost 20 chars"),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export type CategoryType = CategorySchema & { id: Id };

// export const categoryState: ServerActionState<CategorySchema | CategoryType> = {
//   fields: {
//     name: "",
//   },
//   errors: {},
//   message: "",
//   success: undefined,
// };
