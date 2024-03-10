import React from "react";
import styled from "styled-components";
import iconLeft from "@/../public/assets/svgs/angle-small-left.svg";
import iconRight from "@/../public/assets/svgs/angle-small-right.svg";
import iconDoubleLeft from "@/../public/assets/svgs/angle-double-small-left.svg";
import iconDoubleRight from "@/../public/assets/svgs/angle-double-small-right.svg";

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
        <button
          className="btn_arrow double_left"
          onClick={() => setPage(Math.max(1, page - 10))}
        />
        <button
          className="btn_arrow left"
          onClick={() => setPage(Math.max(1, page - 1))}
        />
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
        <button
          className="btn_arrow right"
          onClick={() => setPage(Math.max(1, page + 1))}
        />
        <button
          className="btn_arrow double_right"
          onClick={() => setPage(Math.max(1, page + 10))}
        />
      </div>
    </PageSection>
  );
};

const PageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 40px;
    height: 40px;
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
  &.active {
    font-weight: 800;
    background-color: var(--color-main);
    border-radius: 5px;
    color: white;
  }
`;

export default Pagination;
