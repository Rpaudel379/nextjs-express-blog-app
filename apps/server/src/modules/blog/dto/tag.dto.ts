import { z } from "zod";
import { IdSchema } from "@utils/index";

export const tagSchemaDTO = z.object({
  name: z
    .string({
      required_error: "tag is required"
    })
    .min(3, "tag length must be aleast 3 chars")
    .max(20, "tag length must be atmost 20 chars")
});

export const tagDTO = tagSchemaDTO.merge(
  z.object({
    id: IdSchema
  })
);

export type TagSchemaDTO = z.infer<typeof tagSchemaDTO>;

export type TagDTO = z.infer<typeof tagDTO>;
