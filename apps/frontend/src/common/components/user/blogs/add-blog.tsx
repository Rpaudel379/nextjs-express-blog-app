"use client";

import { categorySchema, CategoryType } from "@/common/schema/category.schema";
import { tagSchema, TagType } from "@/common/schema/tags.schema";
import React from "react";
import { ComboboxForm } from "@components/combobox-form";

import Editor from "@logicabeans/lexical-editor";
import { ServerActionState } from "@/common/schema/common.schema";
import { ImageType } from "@/common/schema/image.schema";

type Props = {
  categories?: CategoryType[];
  tags: TagType[];
  uploadImageAction: (data: FormData) => Promise<ServerActionState<ImageType>>;
  // uploadImage: (formData: FormData) => void;
};

const AddBlog = ({ categories, tags, uploadImageAction }: Props) => {
  

  const onImageUpload = async (data: File[]) => {
    const formData = new FormData();
    formData.set("image", data[0]);
    const img = await uploadImageAction(formData);
    console.log(img);
    return {
      url: img.data?.url || "",
    };
  };

  return (
    <div>
      {/* category and tags */}
      <div className="flex space-y-6 flex-col md:flex-row md:space-x-5 md:space-y-0">
        <ComboboxForm
          data={categories || []}
          schema={categorySchema}
          text="category"
        />
        <ComboboxForm data={tags} schema={tagSchema} text="tag" />
      </div>

      {/* rich text editor */}
      <Editor
        selectedFile={[]}
        label="Hello"
        defaultValue=""
        handleSelectedFile={() => {}}
        onChange={() => {}}
        onFileDelete={() => {}}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default AddBlog;
