// import { fetchBlogById } from "@/common/services/requests/blogs";
import BlogPage from "@modules/blog/blog-page";
import React from "react";

// todo metadata

const Page = async ({ params }: { params: { slug: string } }) => {
  return <BlogPage id={params.slug} />;
};

export default Page;
