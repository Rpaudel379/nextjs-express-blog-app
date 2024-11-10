"use client";

import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { BlogType } from "@/common/schema/blog.schema";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

const columnHelper = createColumnHelper<BlogType>();

type columnProps = {
//   onEdit: (blog: BlogType) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const getBlogColumns = ({ onEdit, onDelete }: columnProps) =>
  [
    columnHelper.accessor("title", {
      header: () => <b>Title</b>,
    }),

    columnHelper.accessor("category", {
      header: () => <b>Category</b>,
      cell: (info) => info.getValue().name,
    }),

    columnHelper.accessor("tags", {
      header: () => <b>Tags</b>,
      cell: (info) => (
        <p>
          {info
            .getValue()
            ?.map((el) => el.name)
            .join(", ")}
        </p>
      ),
    }),

    columnHelper.display({
      id: "actions",
      cell: (props) => {
        const blog = props.row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onEdit(blog.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(blog.id)}>
                delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ] as ColumnDef<BlogType>[];
