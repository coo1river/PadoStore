import styled from "styled-components";

export const OrderMain = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 10px;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .progress_wrap {
    gap: 110px;
    margin: 40px;
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

  p {
    font-weight: 600;
    font-size: 15px;
  }

  .progress_wrap_article {
    display: flex;
    justify-content: center;
    position: relative;
  }
`;

export const OrderDetArticle = styled.article`
  display: flex;
  width: calc(100% - 40px);
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  position: relative;

  .img_and_info {
    cursor: pointer;
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
    font-weight: 700;
  }

  .product_nickname {
    font-size: 14px;
  }

  .btn_end {
    padding: 10px 20px;
    background-color: var(--color-main);
    color: white;
    font-weight: 500;
  }

  .disable {
    background-color: var(--color-lightgrey);
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
  top: 41px;
  position: absolute;
`;

interface OrderProgressBarProps {
  status?: string;
}

export const OrderProgressBar = styled.div<OrderProgressBarProps>`
  margin-bottom: 30px;
  width: 130px;
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

export const OrderInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 주문 정보
export const OrderInfo = styled.article`
  text-align: start;
  width: calc(100% - 40px);
  margin: 20px;
  border-radius: 15px;

  .title_btn_wrap {
    border-bottom: 2px solid var(--color-trans-grey);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .btn_edit {
      background-color: transparent;
      margin: 0;
      font-weight: 500;
      font-size: 14px;
    }
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    padding: 10px 0;
    color: var(--color-main);
  }

  h3:not(.title_btn_wrap h3) {
    border-bottom: 2px solid var(--color-trans-grey);
  }

  div {
    display: flex;
    flex-direction: column;
  }

  p {
    text-align: start;
    line-height: 2.3rem;

    strong,
    label {
      display: inline-block;
      width: 105px;
    }

    span,
    input {
      font-size: 15px;
      font-weight: 400;
    }

    input {
      width: calc(100% - 115px);
      padding: 0;
      border-bottom: 2px solid var(--color-trans-grey);

      &:focus {
        border-bottom: 2px solid #3eabfab8;
      }
    }
  }

  .product_info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .product_name {
      width: 200px;
      font-weight: 500;
    }

    p {
      font-weight: 400;
    }
  }

  .total_price {
    border-top: 2px solid var(--color-trans-grey);
    display: flex;
    justify-content: space-between;
  }
`;
