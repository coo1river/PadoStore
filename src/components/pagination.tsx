import React from "react";
import { PageSection } from "@/styles/paginationStyle";

interface PaginationProps {
  totalPosts: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  page,
  setPage,
}) => {
  const numPages = Math.ceil(totalPosts / 10);

  return (
    <PageSection>
      <div>
        <button onClick={() => setPage(Math.max(1, page - 10))}>{"<<"}</button>
        <button onClick={() => setPage(Math.max(1, page - 1))}>{"<"}</button>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              style={{
                fontWeight: i + 1 === page ? "bold" : "normal",
              }}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(Math.max(1, page + 1))}>{">"}</button>
        <button onClick={() => setPage(Math.max(1, page + 10))}>{">>"}</button>
      </div>
    </PageSection>
  );
};

export default Pagination;
