import { fetchBlogs } from "@services/requests/blogs";
import BlogThumbnail from "@modules/blog/blog-thumbnail";
// import BlogMenu from "@/common/components/user/BlogMenu";
// import Categories from "@modules/category/categories";
// import Tags from "@modules/tag/tags";

const HomePage = async () => {
  const { data } = await fetchBlogs();

  return (
    <div className="w-full my-auto">
      {/* <BlogMenu>
        <Categories />
        <Tags />
      </BlogMenu> */}

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
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
