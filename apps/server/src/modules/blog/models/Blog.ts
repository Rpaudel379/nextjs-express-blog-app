import mongoose, { Document } from "mongoose";
import { BlogSchemaDTO } from "@blog/dto/blog.dto";
import { NextFunction } from "express";
import Category from "./Category";
import { AppError } from "@/common/utils/errors";
import ImageMetadata from "@/modules/common/image/image.model";
import Tag from "./Tag";

export interface BlogEntity
  extends Omit<BlogSchemaDTO, "category" | "tags" | "primaryImage" | "images">,
    Document {
  category: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  primaryImage: mongoose.Types.ObjectId;
  images: mongoose.Types.ObjectId[];
}

const blogSchema = new mongoose.Schema<BlogEntity>(
  {
    title: {
      type: String,
      minlength: [3, "title must be atleast 3 chars"],
      maxlength: [50, "title must be atmost 50 chars"],
      trim: true,
      required: true,
      unique: true
    },
    description: {
      type: String,
      minlength: [10, "description must be atleast 10 chars"],
      maxlength: [1000, "description must be atmost 2000 chars"],
      trim: true,
      required: true
    },
    excerpt: {
      type: String
    },
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    tags: [
      {
        ref: "Tag",
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    primaryImage: {
      ref: "ImageMetadata",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    images: [{ ref: "ImageMetadata", type: mongoose.Schema.Types.ObjectId }]
  },
  {
    timestamps: true
  }
);

// Pre-save hook to validate all references
blogSchema.pre("save", async function (next) {
  const blog = this as BlogEntity & Document;

  const categoryExists = await Category.exists({ _id: blog.category });
  if (!categoryExists) {
    throw new AppError("Not Found", 404, {
      category: ["category id does not exist"]
    });
  }

  const primaryImageExists = await ImageMetadata.exists({
    _id: blog.primaryImage
  });
  if (!primaryImageExists) {
    throw new AppError("Not Found", 404, {
      primaryImage: ["primary image id does not exist"]
    });
  }

  for (const tagId of blog.tags) {
    const tagExists = await Tag.exists({ _id: tagId });
    if (!tagExists) {
      throw new AppError("Not Found", 404, {
        tags: ["Tag id does not exist"]
      });
    }
  }

  for (const imageId of blog.images) {
    const imageExists = await ImageMetadata.exists({ _id: imageId });
    if (!imageExists) {
      throw new AppError("Not Found", 404, {
        images: ["Image id does not exist"]
      });
    }
  }

  next();
});

const Blog = mongoose.model<BlogEntity>("Blog", blogSchema);
export default Blog;
