import { BACKEND_URL } from "@/common/assets/constants/constants";
import { ApiResponse } from "@/common/schema/common.schema";
import { ImageType } from "@/common/schema/image.schema";

export const fetchImages = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/image`, {
      method: "GET",
      cache: "no-cache",
    });

    const images: ApiResponse<ImageType[]> = await response.json();
    return images;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const fetchImageById = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/image/${id}`, {
      method: "GET",
      cache: "no-cache",
    });

    const image: ApiResponse<ImageType> = await response.json();
    return image;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const uploadImage = async (formdata: FormData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/image`, {
      method: "POST",
      body: formdata,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });

    const uploadImage: ApiResponse<ImageType> = await response.json();

    return uploadImage;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};

export const deleteImage = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/image/${id}`, {
      method: "DELETE",
    });

    const deleteImage: ApiResponse<ImageType> = await response.json();

    return deleteImage;
  } catch (error) {
    // uncaught error
    // will be thrown to the nearest error.tsx page
    throw new Error("Oops, Something went wrong! Please try again");
  }
};
