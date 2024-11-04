import fs from "fs/promises";

export const removeImageFromUploads = async (imagePath: string) => {
  try {
    await fs.unlink(imagePath);
  } catch {
    return;
  }
};