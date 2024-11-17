"use client";

// import Link from "next/link";
// import { Button } from "@/common/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/common/components/ui/pagination";
import { Pagination as PaginationType } from "@/common/schema/common.schema";
import { ReactNode } from "react";

type Props = {
  page: number;
  limit: number;
  pagination: PaginationType;
};

const PaginationComponent = ({ page, pagination }: Props) => {
  const renderPages = () => {
    const maxPages = 5;
    const items: ReactNode[] = [];
    if (pagination.pages < maxPages) {
      for (let i = 1; i <= pagination.pages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={`/?page=${i}`} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return items;
    }

    items.push(
      <PaginationItem key={1}>
        <PaginationLink href={`/?page=${1}`} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (page > 3) {
      items.push(
        <PaginationItem key={"ellipsis-start"}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(pagination.pages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/?page=${i}`} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < pagination.pages - 2) {
      items.push(
        <PaginationItem key={"ellipsis-end"}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key={pagination.pages}>
        <PaginationLink
          href={`/?page=${pagination.pages}`}
          isActive={page === pagination.pages}
        >
          {pagination.pages}
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="mt-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/?page=${page > 1 ? page - 1 : 1}`} />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext
              href={`/?page=${page >= pagination.pages ? page : page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
