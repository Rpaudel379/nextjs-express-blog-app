import { Router } from "express";

import { validateBody } from "@middlewares/validation";

import * as BlogController from "@blog/controllers/blog.controller";
import * as CategoryController from "@blog/controllers/category.controller";
import * as TagController from "@blog/controllers/tag.controller";

import { blogSchemaDTO } from "@blog/dto/blog.dto";
import { categorySchemaDTO } from "@blog/dto/category.dto";
import { tagSchemaDTO } from "@blog/dto/tag.dto";

const router = Router();

router.post(
  "/",
  validateBody(blogSchemaDTO),
  BlogController.createBlog
);

router.get("/", BlogController.getAllBlogs);
router.get("/blog/:id", BlogController.getBlogById);

router.patch(
  "/blog/:id",
  validateBody(blogSchemaDTO),
  BlogController.updateBlog
);

router.delete("/blog/:id", BlogController.deleteBlog);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// routes related to category
router.post(
  "/category",
  validateBody(categorySchemaDTO),
  CategoryController.createCategory
);
router.get("/category", CategoryController.getAllCategories);
router.get("/category/:id", CategoryController.getCategoryById);
router.patch(
  "/category/:id",
  validateBody(categorySchemaDTO),
  CategoryController.updateCategory
);
router.delete("/category/:id", CategoryController.deleteCategory);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// routes related to tags

router.post("/tags", validateBody(tagSchemaDTO), TagController.createTag);
router.get("/tags", TagController.getAllTags);
router.get("/tags/:id", TagController.getTagById);
router.patch("/tags/:id", validateBody(tagSchemaDTO), TagController.updateTag);
router.delete("/tags/:id", TagController.deleteTag);

export default router;
