import DashboardBlogPage from "@/modules/dashboard/blogs/blog-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs Dashboard",
  description: "Dashboard Page",
};

const DashboardBlogs = () => {
  return <DashboardBlogPage />;
};

export default DashboardBlogs;
