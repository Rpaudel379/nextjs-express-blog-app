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

type Props = {
  blogs?: BlogType[];
};

const Blogs = ({ blogs }: Props) => {
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

  const columns = getBlogColumns({ onEdit, onDelete });
  return (
    <div>
      <div className="space-y-5 flex-col">
        <Link href={"/blogs/add"}>
          <Button>Add Blog</Button>
        </Link>

        {blogs && <DataTable data={blogs} columns={columns} />}
      </div>
    </div>
  );
};

export default Blogs;
