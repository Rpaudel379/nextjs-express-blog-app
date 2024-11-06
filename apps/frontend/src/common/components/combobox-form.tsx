"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { cn } from "@utils/lib/utils";
// import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { CategoryType } from "@common/schema/category.schema";
import { TagType } from "@common/schema/tags.schema";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";

type Props = {
  data: CategoryType[] | TagType[];
  schema: ZodSchema;
  text: string;
};

export const ComboboxForm = ({ data, schema, text }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Choose {text}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      role="checkbox"
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? data.find((d) => d.name === field.value)?.name
                        : `select ${text}`}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder={`search ${text}`} />

                    <CommandList>
                      <CommandEmpty>{text} Not found</CommandEmpty>

                      <CommandGroup>
                        {data.map((d) => (
                          <CommandItem
                            value={d.name}
                            key={d.id}
                            onSelect={() => {
                              form.setValue("name", d.name);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                d.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {d.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">select {text}</Button>
      </form>
    </Form>
  );
};
