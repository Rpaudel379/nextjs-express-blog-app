import { config } from "dotenv";

// dotenv config
config();

// env constants
const env = process.env;
export const PORT = env.PORT || 5000;
export const DB_URI =
  env.DB_URI || "mongodb://localhost:27017/logicabeans_blog";
export const NODE_ENV = env.NODE_ENV || "development";

//? other env variables

// custom constants
export const IMAGE_SIZE = 20 * 1024 * 1024; // 20 Mb - MAXIMUM IMAGE SIZE
export const MAXIMUM_IMAGES = 6; // MAXIMUM NUMBER OF IMAGES TO UPLOAD
export const PAGE_SIZE = 10; // PER PAGE DISPLAY
export const PAGE = 1; // CURRENT PAGE

export const SUCCESS = "success";
export const FAILED = "failed";
export const ERROR = "error";

export const Messages = {
  STATUS: {
    SUCCESS: "success",
    FAILED: "failed",
    ERROR: "error"
  },
  CREATED: {
    BLOG: "Blog successfully created",
    CATEGORY: "Category successfully created",
    TAG: "Tag successfully created",
    IMAGE_METADATA: "Image metadata successfully created"
  },
  FETCHED_ALL: {
    BLOGS: "All blogs fetched successfully",
    CATEGORIES: "All categories fetched successfully",
    TAGS: "All tags fetched successfully",
    IMAGES_METADATA: "All image metadata fetched successfully"
  },
  FETCHED: {
    BLOG: "Blog fetched successfully",
    CATEGORY: "Category fetched successfully",
    TAG: "Tag fetched successfully",
    IMAGE_METADATA: "Image metadata fetched successfully"
  },
  UPDATED: {
    BLOG: "Blog updated successfully",
    CATEGORY: "Category updated successfully",
    TAG: "Tag updated successfully",
    IMAGE_METADATA: "Image metadata updated successfully"
  },
  DELETED: {
    BLOG: "Blog deleted successfully",
    CATEGORY: "Category deleted successfully",
    TAG: "Tag deleted successfully",
    IMAGE_METADATA: "Image metadata deleted successfully"
  },
  ERROR: {
    GENERAL: "Something went wrong! Please try again."
  }
};

export const BLOG_CREATED = "Blog successfully created";
export const CATEGORY_CREATED = "Category successfully created";
export const TAG_CREATED = "Tag successfully created";
export const IMAGE_METADATA_CREATED = "Image metadata successfully created";

export const BLOGS_FETCHED = "All blogs fetched successfully";
export const CATEGORIES_FETCHED = "All categories fetched successfully";
export const TAGS_FETCHED = "All tags fetched successfully";
export const IMAGES_METADATA_FETCHED =
  "All image metadata fetched successfully";

export const BLOG_FETCHED = "Blog fetched successfully";
export const CATEGORY_FETCHED = "Category fetched successfully";
export const TAG_FETCHED = "Tag fetched successfully";
export const IMAGE_METADATA_FETCHED = "Image metadata fetched successfully";

export const BLOG_UPDATED = "Blog updated successfully";
export const CATEGORY_UPDATED = "Category updated successfully";
export const TAG_UPDATED = "Tag updated successfully";
export const IMAGE_METADATA_UPDATED = "Image metadata updated successfully";

export const BLOG_DELETED = "Blog deleted successfully";
export const CATEGORY_DELETED = "Category deleted successfully";
export const TAG_DELETED = "Tag deleted successfully";
export const IMAGE_METADATA_DELETED = "Image metadata deleted successfully";

export const SOMETHING_WENT_WRONG = "Something went wrong! Please try again.";
