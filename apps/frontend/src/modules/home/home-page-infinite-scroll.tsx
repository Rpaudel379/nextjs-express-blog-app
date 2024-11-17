import { BlogType } from "@/common/schema/blog.schema";
import { SearchParams } from "@/common/schema/common.schema";
import InfiniteBlogs from "./infinite-blogs";
import { getInfiniteBlogsAction } from "@/common/services/actions/blogs";

const InfiniteScrollHomePage = async ({ searchParams }: SearchParams) => {
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams.page) : 1;

  const limit =
    typeof searchParams?.limit === "string" ? Number(searchParams.limit) : 3;

 
  const { data }: { data?: BlogType[] } = await getInfiniteBlogsAction({});

  return (
    <div className="w-full my-auto mb-10 container">
      <div className="">
        {data?.length === 0 && (
          <div>
            <h1 className="text-3xl">No Blogs</h1>
          </div>
        )}

        <InfiniteBlogs
          initialBlogs={data}
          page={page}
          limit={limit}
          //   pagination={pagination}
        />
      </div>
    </div>
  );
};

export default InfiniteScrollHomePage;
