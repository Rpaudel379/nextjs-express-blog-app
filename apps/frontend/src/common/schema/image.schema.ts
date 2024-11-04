import { Id } from "@common/schema/common.schema";

export type ImageType = {
  id: Id;
  url: string;
  path: string;
  originalname: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
};
