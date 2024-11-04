"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { TagType } from "@common/schema/tags.schema";
import { MoreHorizontal } from "lucide-react";

const columnHelper = createColumnHelper<TagType>();

type columnProps = {
  onEdit: (tag: TagType) => void;
  onDelete: (id: string) => void;
};

export const getTagColumns = ({
  onEdit,
  onDelete,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
columnProps): ColumnDef<TagType, any>[] => [
  columnHelper.accessor("name", {
    header: () => <b>Name</b>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <b>Id</b>,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      const tag = props.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onEdit(tag)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(tag.id)}>
              delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const columns: ColumnDef<TagType, any>[] = [
//   columnHelper.accessor("name", {
//     header: () => <b>Name</b>,
//   }),
//   columnHelper.accessor("id", {
//     cell: (info) => <i>{info.getValue()}</i>,
//     header: () => <b>Id</b>,
//   }),
//   columnHelper.display({
//     id: "actions",
//     // cell: (props) => {
//     //   const id = props.row.original.id;
//     cell: () => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start">
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   }),
// ];
