"use server";

import { uploadImage } from "@services/requests/image";

import { ServerActionState } from "@/common/schema/common.schema";
import { ImageType } from "@/common/schema/image.schema";

export const uploadImageAction = async (
  formData: FormData
): Promise<ServerActionState<ImageType>> => {
  try {
    const response = await uploadImage(formData);

    if (response.status === "failed" || response.status === "error") {
      return {
        success: false,
        message: "failed to upload image",
        errors: response.errors || {},
      };
    }

    return {
      message: "image uploaded",
      success: true,
      data: response.data,
      errors: {},
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while creating category");
  }
};
