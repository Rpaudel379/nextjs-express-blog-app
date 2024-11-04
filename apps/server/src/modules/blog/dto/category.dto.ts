import { z } from "zod";
import { IdSchema } from "@utils/index";

export const categorySchemaDTO = z.object({
  name: z
    .string({
      required_error: "category is required"
    })
    .min(3, "category length must be aleast 3 chars")
    .max(20, "category length must be atmost 20 chars")
});

export const categoryDTO = categorySchemaDTO.merge(
  z.object({
    // _id: z.custom<mongoose.Schema.Types.ObjectId>(),
    id: IdSchema
  })
);

export type CategorySchemaDTO = z.infer<typeof categorySchemaDTO>;

export type CategoryDTO = z.infer<typeof categoryDTO>;
