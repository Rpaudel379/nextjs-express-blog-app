import mongoose, { Document } from "mongoose";
import { CategorySchemaDTO } from "@blog/dto/category.dto";

// Define the Category interface
export interface CategoryEntity extends CategorySchemaDTO, Document {}

const categorySchema = new mongoose.Schema<CategoryEntity>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [3, "category length must be aleast 3 chars"],
      maxlength: [20, "category length must be atmost 20 chars"]
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model<CategoryEntity>("Category", categorySchema);

export default Category;
