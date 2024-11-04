import TagPage from "@modules/dashboard/tag/tag-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs Dashboard",
  description: "Dashboard Page",
};

const DashboardBlogs = () => {
  return <TagPage />;
};

export default DashboardBlogs;
