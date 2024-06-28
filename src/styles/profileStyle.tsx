import styled from "styled-components";
import { LoginMain } from "./loginStyle";

export const ProfileMain = styled(LoginMain)`
  justify-content: start;
  align-items: start;
  height: 100%;
  min-height: calc(100vh - 215px);

  .list_wrap {
    background-color: white;
    border-radius: 15px;
    width: 100%;
    max-width: 1080px;

    display: flex;
    margin: 0 auto;
    margin-bottom: 30px;
    box-shadow: 0px 0px 4px 0px #0000001f;
  }

  .nav_menu {
    width: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;

    font-size: 14px;
    box-sizing: border-box;
    padding: 20px;
    color: white;
    border-radius: 10px;
    background-color: var(--color-main);

    p {
      padding-left: 10px;
      line-height: 2rem;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 3px solid white;
    }

    li {
      font-size: 15px;
      margin: 10px 0;
      padding: 10px;
      cursor: pointer;

      &.active {
        background-color: white;
        color: var(--color-main);
        border-radius: 15px;
        font-weight: bold;
      }
    }
  }
`;

export const ImgProfile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const UserProfile = styled.section`
  width: 100%;
  max-width: 1080px;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  padding: 30px;
  gap: 30px;

  .nickname {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 10px;
  }

  .profile_info_wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rating {
    font-weight: 600;
  }

  .review_wish_list {
    display: flex;
    gap: 10px;
  }

  button {
    padding: 5px 20px;
    font-size: 16px;

    span {
      font-weight: 700;
    }
  }
`;

export const ArticleList = styled.article`
  margin: 10px 20px;
  padding: 20px;
  width: 100%;
  line-height: 1.5rem;

  button {
    padding: 5px 20px;
    border-radius: 15px;
    margin: 0 10px 10px 0;
    font-weight: 600;
    background-color: var(--color-trans-grey);

    &.active {
      background-color: var(--color-main);
      color: white;
    }
  }

  ul {
    margin: 15px 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 2px solid var(--color-trans-grey);
    cursor: pointer;
  }

  p {
    text-align: center;
  }

  .product_id {
    visibility: hidden;
  }

  .product_title {
    font-weight: 600;
  }

  .nickname_dt_wrap {
    display: flex;
    gap: 10px;
  }

  .product_date {
    font-size: 13px;
  }
`;

// 공구 관리 상세
export const ManageMain = styled(ProfileMain)`
  h2 {
    width: 1080px;
    font-size: 24px;
    font-weight: bold;
    padding-left: 30px;
    margin: 30px auto;
  }

  .list_wrap {
    height: calc(100vh - 370px);
  }
`;

export const ManageTable = styled.table`
  width: 100%;

  th {
    padding: 5px;
    font-weight: bold;
    background-color: var(--color-trans-grey);
  }

  td {
    padding: 5px;
    text-align: center;
    vertical-align: middle;
    border-bottom: 2px solid var(--color-trans-grey);

    &.order_dt {
      white-space: pre-wrap;
    }

    .product_item {
      width: 120px;
    }

    .traking_number {
      width: 80px;
    }

    input,
    select {
      &:focus,
      &:active {
        outline: 2px solid var(--color-main);
      }
    }

    select {
      padding: 5px 10px;
      box-shadow: 0px 0px 4px 0px #6d6d6d4e;
      border-radius: 8px;
      border: none;
      font-family: var(--font-main);
      font-size: 15px;
    }

    input {
      width: 120px;
      box-shadow: 0px 0px 4px 0px #91919145;
      padding: 5px 10px;
      border-radius: 8px;
    }
  }

  button {
    margin-right: 0 auto;
    background-color: var(--color-main);
    color: white;
  }
`;

// 후기 목록 스타일
export const ReviewListMain = styled.main`
  article {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;

    .nickname_review_wrap {
      display: flex;

      .nickname {
        margin-right: 10px;
      }
    }
  }
`;

// 찜 목록 스타일
export const PostLikeListMain = styled.main`
  article {
    display: flex;
  }
`;
