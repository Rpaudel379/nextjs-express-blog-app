import CategoryPage from "@/modules/dashboard/category/category-page";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs Dashboard",
  description: "Dashboard Page",
};

const DashboardBlogs = () => {
  return <CategoryPage />;
};

export default DashboardBlogs;
