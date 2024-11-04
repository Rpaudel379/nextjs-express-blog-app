import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs Dashboard",
  description: "Dashboard Page",
};

const DashboardBlogs = () => {
  return (
    <div className="bg-slate-200">
      <h1 className="text-4xl">My blogs</h1>
    </div>
  );
};

export default DashboardBlogs;
