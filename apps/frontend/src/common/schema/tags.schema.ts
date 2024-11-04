import { z } from "zod";
import { Id, ServerActionState } from "@/common/schema/common.schema";

export const tagSchema = z.object({
  name: z
    .string({
      required_error: "tag is required",
    })
    .min(3, "tag length must be aleast 3 chars")
    .max(20, "tag length must be atmost 20 chars"),
});

export type TagSchema = z.infer<typeof tagSchema>;

export type TagType = TagSchema & {
  id: Id;
};

// export const tagState: ServerActionState<TagSchema> = {
//   fields: {
//     name: "",
//   },
//   errors: {},
//   message: "",
//   success: undefined,
// };
