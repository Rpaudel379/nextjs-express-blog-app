// type Props = {};

import Link from "next/link";
import { Button } from "@components/ui/button";
import { BlogType } from "@/common/schema/blog.schema";

type Props = {
  blogs?: BlogType[];
};

const Blogs = ({}: Props) => {
  return (
    <div>
      <div className="space-y-5 flex-col">
        <Link href={"/blogs/add"}>
          <Button>Add Blog</Button>
        </Link>

        {/* <DataTable data={} columns={} /> */}
      </div>
    </div>
  );
};

export default Blogs;
