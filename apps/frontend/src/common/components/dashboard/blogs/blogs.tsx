"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { BlogType } from "@/common/schema/blog.schema";
import DataTable from "@components/data-table";
import { getBlogColumns } from "@/modules/dashboard/blogs/columns";
import { toast } from "sonner";
import { ServerActionState } from "@/common/schema/common.schema";
import { deleteBlogAction } from "@/common/services/actions/blogs";
import Modal from "@components/modal-component";
import { useState } from "react";
import Image from "next/image";
import Editor from "@logicabeans/lexical-editor";

type Props = {
  blogs?: BlogType[];
};

const Blogs = ({ blogs }: Props) => {
  const [open, setOpen] = useState(false);
  const [primaryImageUrl, setPrimaryImageUrl] = useState<string | null>(null);
  const [blogDescription, setBlogDescription] = useState<string>("");

  const router = useRouter();
  const onDelete = async (id: string) => {
    toast("deleting...");
    const deleteBlog: ServerActionState<undefined> = await deleteBlogAction(id);
    if (deleteBlog.success) {
      toast.success(deleteBlog.message);
    } else {
      toast.error(deleteBlog.message);
    }
  };

  const onEdit = async (id: string) => {
    router.push(`/blogs/${id}/edit`);
  };

  const onPrimaryImageClick = (url: string) => {
    setPrimaryImageUrl(url);
    openModal();
  };

  const onBlogDescriptionClick = (richText: string) => {
    setBlogDescription(richText);
    openModal();
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const columns = getBlogColumns({
    onEdit,
    onDelete,
    onPrimaryImageClick,
    onBlogDescriptionClick,
  });

  return (
    <div>
      <div className="space-y-5 flex-col">
        <Link href={"/blogs/add"}>
          <Button>Add Blog</Button>
        </Link>

        {blogs && <DataTable data={blogs} columns={columns} />}

        {(primaryImageUrl || blogDescription) && (
          <Modal
            open={open}
            onOpenChange={setOpen}
            dialogTitle={`${primaryImageUrl ? "Primary Image" : "Blog Description"}`}
            dialogContent={
              <div>
                {primaryImageUrl && (
                  <Image
                    alt="primary image"
                    height={500}
                    width={500}
                    className="w-full h-full"
                    src={primaryImageUrl!}
                  />
                )}

                {blogDescription && (
                  <Editor
                    selectedFile={[]}
                    defaultValue={blogDescription || ""}
                    handleSelectedFile={() => {}}
                    onChange={() => {}}
                    onFileDelete={() => {}}
                  />
                )}
              </div>
            }
            onCancel={() => {
              setPrimaryImageUrl(null);
              setBlogDescription("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Blogs;
