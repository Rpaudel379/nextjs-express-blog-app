"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlogThumbnail from "@modules/blog/blog-thumbnail";
import { BlogType } from "@/common/schema/blog.schema";
import { Pagination } from "@/common/schema/common.schema";
import { getInfiniteBlogsAction } from "@/common/services/actions/blogs";

type Props = {
  initialBlogs: BlogType[] | undefined;
  page: number;
  limit: number;
  pagination?: Pagination;
};

const InfiniteBlogs = ({ initialBlogs }: Props) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const loadMoreBlogs = async () => {
    const nextPage = page + 1;
    // doom scroll
    // const nextPage = (page % 2) + 1;
    const blogAction = await getInfiniteBlogsAction({
      searchParams: { page: nextPage.toString() },
    });
    setBlogs((prevBlogs: BlogType[] | undefined) => [
      ...(prevBlogs ?? []),
      ...(blogAction.data ?? []),
    ]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreBlogs();
    }
  }, [inView]);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs?.map((blog) => (
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
            excerpt={blog.excerpt}
          />
        ))}
      </div>
      <div className="text-center" ref={ref}>
        <div
          className="my-5  h-8 w-8 inline-block rounded-full border-4 border-r-black border-solid animate-spin"
          role="status"
        ></div>
      </div>
    </>
  );
};

export default InfiniteBlogs;
