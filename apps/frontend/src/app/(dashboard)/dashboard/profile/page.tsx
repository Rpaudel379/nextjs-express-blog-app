import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile Dashboard",
  description: "Dashboard Profile Page",
};

const DashboardBlogs = () => {
  return (
    <div className="bg-slate-500">
      <h1 className="text-4xl">My Profile dashboard</h1>
    </div>
  );
};

export default DashboardBlogs;
