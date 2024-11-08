// import { fetchBlogById } from "@/common/services/requests/blogs";
import EditBlogPage from "@/modules/blog/edit-blog-page";
import React from "react";

// todo metadata

const Page = async ({ params }: { params: { slug: string } }) => {
  return <EditBlogPage id={params.slug} />;
};

export default Page;
