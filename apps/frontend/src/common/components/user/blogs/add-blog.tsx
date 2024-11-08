"use client";

import { useRouter } from "next/navigation";
import { CategoryType } from "@/common/schema/category.schema";
import { TagType } from "@/common/schema/tags.schema";
import React, { useState } from "react";

import Editor from "@logicabeans/lexical-editor";
import { ServerActionState } from "@/common/schema/common.schema";
import { ImageType } from "@/common/schema/image.schema";
import { useForm } from "react-hook-form";
import { blogSchema, BlogSchema, BlogType } from "@/common/schema/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Combobox } from "@components/combobox";
import { toast } from "sonner";
import { SubmitButton } from "@components/SubmitButton";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type Props = {
  categories?: CategoryType[];
  tags?: TagType[];
  uploadImageAction: (data: FormData) => Promise<ServerActionState<ImageType>>;
  createBlogAction: (blog: BlogSchema) => Promise<ServerActionState<BlogType>>;
  // uploadImage: (formData: FormData) => void;
};

const AddBlog = ({
  categories,
  tags,
  uploadImageAction,
  createBlogAction,
}: Props) => {
  const router = useRouter();
  const [selectedFile, setselectedFile] = useState<File[] | []>([]);

  const handleSelectedFile = (file: File[]) => {
    console.log("handleSelectedFile");

    if (file.length > 0) {
      setselectedFile((prev) => [...prev, ...file]);
    }
  };
  const handleDelete = (fileName: string) => {
    console.log("handleDelete");

    setselectedFile((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };
  // console.log("`````````````````");
  // console.log(selectedFile);

  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      category: "",
      tags: [],
      excerpt: "",
      description: "",
      primaryImage: "",
      images: [],
    },
  });

  const onImageUpload = async (image: File[]) => {
    const formData = new FormData();
    formData.set("image", image[0]);
    const img = await uploadImageAction(formData);
    console.log(img);
    if (img.success) {
      toast.success(img.message);
    } else {
      toast.error(img.message);
    }
    return {
      url: img.data?.url || "",
    };
  };

  const onPrimaryImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    const file = e.target.files?.[0];
    formData.set("image", file!);
    const img = await uploadImageAction(formData);
    console.log(img);
    if (img.success) {
      toast.success(img.message);
      form.setValue("primaryImage", img.data?.id as string);
      setPreviewImage(img.data?.url as string);
    } else {
      toast.error(img.message);
    }
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
    form.setValue("primaryImage", "");
  };

  const clientAction = async () => {
    form.handleSubmit(async (blog) => {
      const blogAction = await createBlogAction(blog);
      console.log(blogAction);
      if (blogAction.success) {
        toast.success(blogAction.message);
        form.reset();
        router.push("/");
      } else {
        toast.error(blogAction.message);
        console.log(blogAction.errors);
        Object.entries(blogAction.errors).forEach(([field, message]) =>
          form.setError(field as never, {type:"validate" , message: message[0] })
        );
      }
    })();
  };
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  // const [isUploading, setIsUploading] = React.useState(false);

  return (
    <div className="mb-20">
      {/* <div className="text-red-700">
        {form.formState.errors &&
          JSON.stringify(form.formState.errors, null, 2)}
      </div>

      <div>{JSON.stringify(form.getValues())}</div> */}
      {form.formState.errors.root && (
        <p className="text-xl text-red-500">
          {JSON.stringify(form.formState.errors.root, null, 2)}
        </p>
      )}
      <Form {...form}>
        <form
          //  onSubmit={form.handleSubmit(onSubmit)}
          action={clientAction}
          className="space-y-7 mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:w-2/3">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-y-6 flex-col md:flex-row md:space-x-5 md:space-y-0 md:w-2/3">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Combobox
                      items={categories || []}
                      placeholder="Select category..."
                      label="Category"
                      emptyMessage="No category found"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Combobox
                      items={tags || []}
                      placeholder="Select tags..."
                      label="Tags"
                      emptyMessage="No tag found"
                      onChange={field.onChange}
                      multiSelect
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="primaryImage"
              render={({ field }) => (
                <FormItem className="space-y-4 md:w-2/3">
                  <FormLabel>Primary Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={onPrimaryImageUpload}
                      />

                      {previewImage && field.value && (
                        <div className="relative w-full max-w-sm">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            className="rounded-lg shadow-md aspect-video object-cover"
                            width={2000}
                            height={1000}
                          />
                          <div className="absolute top-2 right-2 space-x-2">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={handleImageDelete}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    This will be your main image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="md:w-2/3">
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A short description about the blog"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    selectedFile={selectedFile}
                    defaultValue=""
                    handleSelectedFile={handleSelectedFile}
                    onChange={field.onChange}
                    onFileDelete={handleDelete}
                    onImageUpload={onImageUpload}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton text="Add Blog" />
        </form>
      </Form>
      {/* category and tags */}
      <div className="flex space-y-6 flex-col md:flex-row md:space-x-5 md:space-y-0">
        {/* <Combobox
          items={categories || []}
          placeholder="Select category..."
          label="Category"
          emptyMessage="No category found"
          onChange={handleCategoryChange}
          
        />

        <Combobox
          items={tags || []}
          placeholder="Select tags..."
          label="Tags"
          emptyMessage="No tag found"
          multiSelect
          onChange={handleTagsChange}
        /> */}
      </div>
      {/* <div className="flex space-y-6 flex-col md:flex-row md:space-x-5 md:space-y-0">
        <ComboboxForm
          data={categories || []}
          schema={categorySchema}
          text="category"
        />
        <ComboboxForm data={tags} schema={tagSchema} text="tag" />
      </div> */}
      {/* rich text editor */}
      {/* <Editor
        selectedFile={[]}
        label="Hello"
        defaultValue=""
        handleSelectedFile={() => {}}
        onChange={() => {}}
        onFileDelete={() => {}}
        onImageUpload={onImageUpload}
      /> */}
    </div>
  );
};

export default AddBlog;
