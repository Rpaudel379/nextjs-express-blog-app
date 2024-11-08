"use client";

import React, { useState } from "react";
import { CategoryType } from "@schema/category.schema";
import { TagType } from "@schema/tags.schema";
import { blogSchema, BlogSchema, BlogType } from "@schema/blog.schema";
import { ServerActionState } from "@schema/common.schema";
import { ImageType } from "@schema/image.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Combobox } from "@components/combobox";
import Editor from "@logicabeans/lexical-editor";
import { SubmitButton } from "@components/SubmitButton";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  blog?: BlogType;
  categories?: CategoryType[];
  tags?: TagType[];
  createBlogAction?: (blog: BlogSchema) => Promise<ServerActionState<BlogType>>;
  updateBlogAction?: (
    id: string,
    blog: BlogSchema
  ) => Promise<ServerActionState<BlogType>>;
  uploadImageAction?: (file: FormData) => Promise<ServerActionState<ImageType>>;
};

const TextEditorClient = ({
  blog,
  categories,
  tags,
  createBlogAction,
  updateBlogAction,
  uploadImageAction,
}: Props) => {
  const router = useRouter();

  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog ? blog.title : "",
      category: blog ? blog.category.id : "",
      tags: blog ? blog.tags?.map((tag) => tag.id) : [],
      excerpt: blog ? blog.excerpt : "",
      description: blog ? blog.description : "",
      primaryImage: blog ? blog.primaryImage.id : "",
      images: blog ? blog.images?.map((image) => image.id) : [],
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    blog?.primaryImage.url || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const onImageUpload = async (
    file: File[] | FileList,
    field?: "primaryImage" | "image"
  ) => {
    const formData = new FormData();
    formData.set("image", file[0]);

    setIsUploading(true);
    const image = await uploadImageAction?.(formData);

    console.log(image);

    if (image?.success) {
      toast.success(image?.message);

      if (field === "primaryImage") {
        form.setValue("primaryImage", image?.data?.id as string);
        setPreviewImage(image.data?.url || null);
      }
    } else {
      toast.error(image?.message);
    }

    setIsUploading(false);
    // return the url for Lexical Editor
    return {
      url: image?.data?.url || "",
    };
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
    form.setValue("primaryImage", "");
  };

  const clientAction = () => {
    form.handleSubmit(async (data: BlogSchema) => {
      let blogAction: ServerActionState<BlogType> | undefined;

      // to update a blog
      if (blog) {
        blogAction = await updateBlogAction?.(blog.id, data);
      }
      // to create a new blog
      else {
        blogAction = await createBlogAction?.(data);
      }

      console.log(blogAction);

      if (blogAction?.success) {
        toast.success(blogAction.message);
        form.reset();
        // redirect to home page
        router.push("/");
      } else {
        toast.error(blogAction?.message);
        if (blogAction?.errors) {
          Object.entries(blogAction.errors).forEach(([field, message]) =>
            form.setError(field as never, {
              type: "validate",
              message: message[0],
            })
          );
        }
      }
    })();
  };

  return (
    <div className="mb-20">
      {form.formState.errors.root && (
        <p className="text-xl text-red-500">
          {JSON.stringify(form.formState.errors.root, null, 2)}
        </p>
      )}

      <Form {...form}>
        <form action={clientAction} className="space-y-7 mx-auto">
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
                        disabled={isUploading}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            onImageUpload(e.target.files, "primaryImage");
                          }
                        }}
                      />

                      {isUploading && <p>Uploading image...</p>}

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
                  <FormMessage />
                  <FormDescription>
                    This will be your main image
                  </FormDescription>
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
                    selectedFile={[]}
                    defaultValue={blog?.description || ""}
                    handleSelectedFile={() => {}}
                    onChange={field.onChange}
                    onFileDelete={() => {}}
                    onImageUpload={(data) => onImageUpload(data)}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton text={`${blog ? "Edit Blog" : "Add Blog"}`} />
        </form>
      </Form>
    </div>
  );
};

export default TextEditorClient;
