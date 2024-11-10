import { fetchBlogs } from "@services/requests/blogs";
import Blogs from "@/common/components/dashboard/blogs/blogs";
import { BlogType } from "@/common/schema/blog.schema";

const DashboardBlogPage = async () => {
  const { data: blogs }: { data?: BlogType[] } = await fetchBlogs();

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl text-center">My Blogs</h1>
      {blogs?.length === 0 && (
        <div>
          <h1 className="text-3xl">No Blogs</h1>
        </div>
      )}
      <Blogs blogs={blogs} />
    </div>
  );
};

export default DashboardBlogPage;
 