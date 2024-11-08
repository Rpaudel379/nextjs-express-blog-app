"use client";

import { TagType } from "@/common/schema/tags.schema";
import Modal from "@components/modal-component";
import DataTable from "@components/data-table";

import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@components/ui/button";
import TagForm from "@components/dashboard/tags/tag-form";
import { deleteTagAction } from "@/common/services/actions/tag";
import { getTagColumns } from "@/modules/dashboard/tag/columns";
import { ServerActionState } from "@/common/schema/common.schema";

type Props = {
  tags?: TagType[];
};

const Tags = ({ tags }: Props) => {
  const [openModel, setOpenModel] = useState(false);
  const [tag, setTag] = useState<TagType | null>(null);

  const onDelete = async (id: string) => {
    toast("loading ...");
    const deleteTag: ServerActionState<undefined> = await deleteTagAction(id);
    if (deleteTag.success) {
      toast.success(deleteTag.message);
    } else {
      toast.error(deleteTag.message);
    }
  };

  const onEdit = async (tag: TagType) => {
    setTag(tag);
    setOpenModel(true);
  };

  const columns = getTagColumns({ onEdit, onDelete });

  return (
    <div>
      <div className="space-y-5 flex-col">
        <Button type="button" onClick={() => setOpenModel(true)}>
          Add Tag
        </Button>
        {tags && <DataTable data={tags} columns={columns} />}
      </div>

      <Modal
        open={openModel}
        onOpenChange={setOpenModel}
        dialogTitle={`${tag ? "update tag" : "create new tag"}`}
        dialogContent={
          <TagForm
            tag={tag}
            onSuccess={() => {
              setOpenModel(false);
              setTag(null);
            }}
          />
        }
        containerClassName="lg:w-1/2"
        onCancel={() => setTag(null)}
      />
    </div>
  );
};

export default Tags;
