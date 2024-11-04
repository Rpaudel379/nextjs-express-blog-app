"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/ui/input";
import {
  updateTagAction,
  createTagAction,
} from "@/common/services/actions/tag";
import { tagSchema, TagSchema, TagType } from "@common/schema/tags.schema";
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
  tag: TagType | null;
  onSuccess?: () => void;
};

const TagForm = ({ tag, onSuccess }: Props) => {
  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: tag ? tag.name : "",
    },
  });

  const clientAction = async () => {
    form.handleSubmit(async (data) => {
      // prevent the request if name has not changed for updating
      if (data.name === tag?.name) {
        return;
      }
      let tagAction: ServerActionState;

      if (tag) {
        tagAction = await updateTagAction({
          ...data,
          id: tag.id,
        });
      } else {
        tagAction = await createTagAction(data);
      }

      if (tagAction.success) {
        toast.success(tagAction.message);
        form.reset({ name: "" });
        onSuccess?.();
      } else {
        // errors can be of category name or id
        // should put either error on 'name' field
        Object.values(tagAction.errors).forEach((message) =>
          form.setError("name", { type: "validate", message: message[0] })
        );
        // form.setError("name", {
        //   type: "validate",
        //   message: tagAction.errors.name[0],
        // });
        toast.error(tagAction.message);
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
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input
                  placeholder={`${tag ? "edit tag" : "create new tag"}`}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                {tag ? "update your tag here!" : "create your tag here!"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text={`${tag ? "Update Tag" : "Create Tag"}`} />
      </form>
    </Form>
  );
};

export default TagForm;
