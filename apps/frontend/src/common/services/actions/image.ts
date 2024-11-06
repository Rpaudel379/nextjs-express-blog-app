"use server";

import { uploadImage } from "@services/requests/image";

// import { ImageType } from "@common/schema/image.schema";
import { ServerActionState } from "@/common/schema/common.schema";
import { ImageType } from "@/common/schema/image.schema";

export const uploadImageAction = async (
  formData: FormData
): Promise<ServerActionState<ImageType>> => {
  console.log("`````````````````");
  console.log("`````````````````");

  console.log(formData);

  try {
    const response = await uploadImage(formData);
    console.log("image resp", response);

    if (response.status === "failed" || response.status === "error") {
      return {
        errors: response.errors || {},
        success: false,
        message: "failed to upload",
      };
    }

    return {
      errors: {},
      message: "image uploaded",
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("ee", error);
    // uncaught error
    // will be thrown to nearest error.tsx page
    throw new Error("something went wrong while creating category");
  }
};
