import type { Metadata } from "next";
import React from "react";
import HomePage from "@/modules/home/home-page";
import { SearchParams } from "@/common/schema/common.schema";
import InfiniteScrollHomePage from "@/modules/home/home-page-infinite-scroll";

export const metadata: Metadata = {
  title: "Blogs",
  description: "list of all blogs",
};

// home page
// the '/' route
const Page = ({ searchParams }: SearchParams) => {
  return (
    // <HomePage searchParams={searchParams} />

    <InfiniteScrollHomePage searchParams={searchParams} />
  );
};

export default Page;
