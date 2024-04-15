import styled from "styled-components";
import { LoginMain } from "./loginStyle";

export const ProfileMain = styled(LoginMain)`
  justify-content: start;
  align-items: start;
  height: calc(100% - 235px);

  .list_wrap {
    background-color: white;
    border-radius: 15px;
    width: 100%;
    height: calc(100vh - 410px);
    max-width: 1080px;

    display: flex;
    margin: 0 auto;
    margin-bottom: 30px;
    box-shadow: 0px 0px 4px 0px #0000001f;
  }

  .nav_menu {
    width: 150px;
    display: flex;
    height: 100%;
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

// 주문 상세
export const OrderDetail = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .progress_wrap {
    gap: 82px;
    margin: 20px;
  }

  .progress_and_text {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;
    z-index: 10;
  }

  div {
    display: flex;
    text-align: center;
  }

  .bar_wrap {
    margin: 20px;
    top: 21px;
    position: absolute;
  }

  p {
    font-weight: 600;
    font-size: 15px;
  }

  .progress_wrap_article {
    position: relative;
    display: flex;
    justify-content: center;
  }
`;

export const OrderDetArticle = styled.article`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  z-index: 10;

  .img_and_info {
    display: flex;
    gap: 30px;
  }

  .product_info_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }

  .product_title {
    font-size: 20px;
  }

  .product_nickname {
    font-size: 14px;
  }

  button {
    padding: 10px 20px;
    background-color: var(--color-main);
    color: white;
    font-weight: 500;
  }
`;

export const ProductImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  object-fit: contain;
`;

export const ProgressBarWrap = styled.div`
  display: flex;
  gap: 30px;
  margin: 20px auto;
  top: 21px;
  position: absolute;
`;

interface OrderProgressBarProps {
  status?: string;
}

export const OrderProgressBar = styled.div<OrderProgressBarProps>`
  margin-bottom: 30px;
  width: 105px;
  height: 5px;
  background-color: #d8d7d7;

  &:first-child {
    background-color: ${(props) =>
      props.status === "입금 대기" ? "#d8d7d7" : "#3EABFA"};
  }

  &:nth-child(2) {
    background-color: ${(props) =>
      props.status === "배송 시작" || props.status === "거래 종료"
        ? "#3EABFA"
        : "#d8d7d7"};
  }

  &:nth-child(3) {
    background-color: ${(props) =>
      props.status === "거래 종료" ? "#3EABFA" : "#d8d7d7"};
  }
`;

// 공구 관리 상세
export const ManageMain = styled(ProfileMain)`
  padding: 30px 0;

  h2 {
    width: 1080px;
    font-size: 24px;
    font-weight: bold;
    padding-left: 30px;
    margin: 0 auto;
  }

  .list_wrap {
    margin-top: 30px;
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
  }
`;
