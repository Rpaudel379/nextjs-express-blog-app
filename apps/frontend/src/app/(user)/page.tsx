import type { Metadata } from "next";
import React from "react";
import HomePage from "@/modules/home/home-page";

export const metadata: Metadata = {
  title: "Blogs",
  description: "list of all blogs",
};

// home page
// the '/' route
const Page = () => {
  return <HomePage />;
};

export default Page;
