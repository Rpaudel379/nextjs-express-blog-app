import { fetchBlogs } from "@services/requests/blogs";
import BlogThumbnail from "@modules/blog/blog-thumbnail";
import { BlogType } from "@/common/schema/blog.schema";
import { Pagination, SearchParams } from "@/common/schema/common.schema";
import PaginationComponent from "./pagination-component";

const HomePage = async ({ searchParams }: SearchParams) => {
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams.page) : 1;

  const limit =
    typeof searchParams?.limit === "string" ? Number(searchParams.limit) : 3;

  const { data, pagination }: { data?: BlogType[]; pagination?: Pagination } =
    await fetchBlogs({ searchParams });

  //todo implement infinite scrolling with pagination
  console.log("pagination", pagination);

  return (
    <div className="w-full my-auto mb-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.length === 0 && (
          <div>
            <h1 className="text-3xl">No Blogs</h1>
          </div>
        )}

        {data?.map((blog) => (
          <BlogThumbnail
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            category={blog.category}
            tags={blog.tags}
            primaryImage={blog.primaryImage}
            images={blog.images}
            createdAt={blog.createdAt}
            excerpt={blog.excerpt}
          />
        ))}
      </div>
      <div>
        <PaginationComponent
          page={page}
          limit={limit}
          pagination={pagination!}
        />
      </div>
    </div>
  );
};

export default HomePage;
