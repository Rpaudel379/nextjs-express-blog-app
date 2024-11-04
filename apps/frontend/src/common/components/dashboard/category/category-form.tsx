"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/ui/input";
import {
  updateCategoryAction,
  createCategoryAction,
} from "@/common/services/actions/category";
import {
  categorySchema,
  CategorySchema,
  CategoryType,
} from "@common/schema/category.schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { SubmitButton } from "@components/SubmitButton";
import { toast } from "sonner";
import { ServerActionState } from "@/common/schema/common.schema";

type Props = {
  category: CategoryType | null;
  onSuccess?: () => void;
};

const CategoryForm = ({ category, onSuccess }: Props) => {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category ? category.name : "",
    },
  });

  const clientAction = async () => {
    form.handleSubmit(async (data) => {
      // prevent the request if name has not changed for updating
      if (data.name === category?.name) {
        return;
      }
      let categoryAction: ServerActionState;

      if (category) {
        categoryAction = await updateCategoryAction({
          ...data,
          id: category.id,
        });
      } else {
        categoryAction = await createCategoryAction(data);
      }

      if (categoryAction.success) {
        toast.success(categoryAction.message);
        form.reset({ name: "" });
        onSuccess?.();
      } else {
        // errors can be of category name or id
        // should put either error on 'name' field
        Object.values(categoryAction.errors).forEach((message) =>
          form.setError("name", { type: "validate", message: message[0] })
        );
        // form.setError("name", {
        //   type: "validate",
        //   message: categoryAction.errors.name[0],
        // });
        toast.error(categoryAction.message);
      }
    })();
  };

  return (
    <Form {...form}>
      <form action={clientAction}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder={`${
                    category ? "edit category" : "create new category"
                  }`}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                {category
                  ? "update your category here!"
                  : "create your category here!"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          text={`${category ? "Update Category" : "Create Category"}`}
        />
      </form>
    </Form>
  );
};

export default CategoryForm;
