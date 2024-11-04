import { z } from "zod";
import { IdSchema } from "@utils/index";

// this will come from multer middleware
export const imageMetadataSchemaDTO = z.object(
  {
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number()
  },
  {
    required_error: "Atleast one image is required"
  }
);

export const imageMetadataDTO = imageMetadataSchemaDTO
  .merge(
    z.object({
      id: IdSchema,
      createdAt: z.date(),
      updatedAt: z.date()
    })
  )
  .omit({
    destination: true,
    encoding: true,
    mimetype: true,
    size: true
  })
  .transform((data) => ({
    ...data,
    url: `http://localhost:5000/${data.path}`
  }));

export type ImageMetadataSchemaDTO = z.infer<typeof imageMetadataSchemaDTO>;
export type ImageMetadataDTO = z.infer<typeof imageMetadataDTO>;

// export const imagesMetadataSchemaDTO = z
//   .array(imageMetadataSchemaDTO, {
//     required_error: "this field is requird"
//   })
//   .nonempty("atleast one image field is required");

// export const imagesMetadataDTO = z.array(imageMetadataDTO).default([]);

// export type ImagesMetadataSchemaDTO = z.infer<typeof imagesMetadataSchemaDTO>;
// export type ImagesMetadataDTO = z.infer<typeof imagesMetadataDTO>;
