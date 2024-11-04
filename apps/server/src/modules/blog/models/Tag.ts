import mongoose, { Document } from "mongoose";
import { TagSchemaDTO } from "@blog/dto/tag.dto";

export interface TagEntity extends TagSchemaDTO, Document {}

const tagSchema = new mongoose.Schema<TagEntity>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [3, "tag length must be aleast 3 chars"],
      maxlength: [20, "tag length must be atmost 20 chars"]
    }
  },
  {
    timestamps: true
  }
);

const Tag = mongoose.model<TagEntity>("Tag", tagSchema);

export default Tag;
