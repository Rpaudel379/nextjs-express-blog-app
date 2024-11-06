import { fetchBlogs } from "@services/requests/blogs";
import Blogs from "@/common/components/dashboard/blogs/blogs";

const DashboardBlogPage = async () => {
  const blogs = await fetchBlogs();

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl text-center">My Blogs</h1>

      {blogs.data?.length === 0 && (
        <div>
          <h1 className="text-3xl">No Blogs</h1>
        </div>
      )}

      <Blogs />
    </div>
  );
};

export default DashboardBlogPage;
