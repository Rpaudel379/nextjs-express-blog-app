import { z } from "zod";
import { Id, idSchema } from "@common/schema/common.schema";
import { CategoryType } from "@common/schema/category.schema";
import { TagType } from "@common/schema/tags.schema";
import { ImageType } from "@common/schema/image.schema";

export const blogSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
    })
    .min(3, "minimum length is 3 chars")
    .max(50, "maximum length is 50 chars"),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(10, "please write more description")
    .max(1000, "max limit for description is 1000 chars"),
  // category: z.custom<mongoose.Schema.Types.ObjectId>(),
  category: idSchema,
  primaryImage: idSchema,
  tags: z.array(idSchema).optional(),
  images: z.array(idSchema).optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

export type BlogType = Omit<
  BlogSchema,
  "category" | "tags" | "primaryImage" | "images"
> & {
  category: CategoryType;
  tags: TagType[] | null;
  primaryImage: ImageType;
  images: ImageType[] | null;
  id: Id;
  createdAt: Date;
  updatedAt?: Date;
};
