// import { BlogSchema } from "../schema/blog.schema";
// import { CategoryType } from "../schema/category.schema";
// import { Id } from "../schema/common.schema";
// import { ImageType } from "../schema/image.schema";
// import { TagType } from "../schema/tags.schema";

// export type BlogType = Omit<
//   BlogSchema,
//   "category" | "tags" | "primaryImage" | "images"
// > & {
//   category: CategoryType;
//   tags: TagType[] | null;
//   primaryImage: ImageType;
//   images: ImageType[] | null;
//   id: Id;
//   createdAt: Date;
//   updatedAt?: Date;
// };
