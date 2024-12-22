import React from "react";
import styled from "styled-components";
import iconLeft from "@/../public/assets/svgs/angle-small-left.svg?url";
import iconRight from "@/../public/assets/svgs/angle-small-right.svg?url";
import iconDoubleLeft from "@/../public/assets/svgs/angle-double-small-left.svg?url";
import iconDoubleRight from "@/../public/assets/svgs/angle-double-small-right.svg?url";

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
        {numPages > 1 && (
          <>
            <button
              className="btn_arrow double_left"
              onClick={() => setPage(Math.max(1, page - 10))}
            />
            <button
              className="btn_arrow left"
              onClick={() => setPage(Math.min(1, page - 1))}
            />
          </>
        )}
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={i + 1 === page ? "active" : ""}
            >
              {i + 1}
            </PageButton>
          ))}
        {numPages > 1 && (
          <>
            <button
              className="btn_arrow right"
              onClick={() => setPage(Math.max(1, page + 1))}
            />
            <button
              className="btn_arrow double_right"
              onClick={() => setPage(Math.min(numPages, page + 10))}
            />
          </>
        )}
      </div>
    </PageSection>
  );
};

const PageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    margin: 10px;
    width: 30px;
    height: 30px;
  }

  .btn_arrow {
    width: 40px;
    height: 40px;
    color: var(--color-main);
    font-weight: 800;
  }

  .left {
    background: url(${iconLeft.src}) center/22px no-repeat;
  }

  .right {
    background: url(${iconRight.src}) center/22px no-repeat;
  }

  .double_left {
    background: url(${iconDoubleLeft.src}) center/22px no-repeat;
  }

  .double_right {
    background: url(${iconDoubleRight.src}) center/22px no-repeat;
  }
`;

const PageButton = styled.button`
  color: var(--color-blackgrey);

  &.active {
    font-weight: 800;
    border-radius: 5px;
    color: var(--color-main);
  }
`;

export default Pagination;
