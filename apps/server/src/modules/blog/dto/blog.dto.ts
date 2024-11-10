import { z } from "zod";
import { categoryDTO } from "@blog/dto/category.dto";
import { tagDTO } from "@blog/dto/tag.dto";
import { imageMetadataDTO } from "@image/image.dto";
import { IdSchema } from "@utils/index";

export const blogSchemaDTO = z.object({
  title: z
    .string({
      required_error: "title is required"
    })
    .min(3, "minimum length is 3 chars")
    .max(50, "maximum length is 50 chars"),
  description: z
    .string({
      required_error: "description is required"
    })
    .min(10, "please write more description")
    .max(1000, "max limit for description is 1000 chars"),
  excerpt: z.string().optional(),
  // category: z.custom<mongoose.Schema.Types.ObjectId>(),
  category: IdSchema,
  tags: z.array(IdSchema).optional(),
  primaryImage: IdSchema,
  images: z.array(IdSchema).optional()
});

export const blogDTO = blogSchemaDTO.merge(
  z.object({
    id: IdSchema,
    category: categoryDTO.nullable(),
    tags: z.array(tagDTO).optional(),
    primaryImage: imageMetadataDTO.nullable(),
    images: z.array(imageMetadataDTO).optional(),
    createdAt: z.date(),
    updatedAt: z.date()
    // _id: z.custom<mongoose.Schema.Types.ObjectId>(),
  })
);

export type BlogSchemaDTO = z.infer<typeof blogSchemaDTO>;
export type BlogDTO = z.infer<typeof blogDTO>;
  