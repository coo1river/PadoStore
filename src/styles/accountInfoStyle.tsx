import styled from "styled-components";

export const AccountInfoWrap = styled.section`
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 4px 0px #b4b4b44e;

  article {
    margin: 0;
  }

  .AccountInfo_title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
  }

  h3 {
    border-radius: 10px;
    color: black;
    font-size: 18px;
    margin: 20px 0;
    font-weight: 700;
  }

  label {
    font-size: 15px;
    font-weight: 500;
    margin-left: 5px;
  }

  input {
    box-shadow: 0px 0px 4px 0px #91919145;
    padding: 10px 20px;
  }

  .account_info_form {
    display: flex;
    flex-direction: column;
  }

  .btn_submit {
    background-color: var(--color-main);
    color: white;
    border-radius: 15px;
    padding: 12px;
    font-size: 17px;
    font-weight: 600;
  }
`;

export const SellerInfo = styled.article`
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  strong {
    font-size: 16px;
    font-weight: 700;
  }

  p {
    margin-left: 5px;
    display: flex;
    gap: 10px;
  }
`;

export const ProductSelect = styled.article`
  li {
    font-weight: 600;
    font-size: 15px;
    background-color: #e1e1e14e;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count_wrap {
    display: flex;
    align-items: center;
    border: 1px solid var(--color-trans-grey);
  }

  span {
    text-align: center;
    width: 15px;
    font-weight: 400;
    padding: 6.1px 25px;
    background-color: white;
  }

  .product_price {
    margin-right: 15px;
  }

  .btn_count {
    padding: 5px 12px;
    background-color: var(--color-main);
    color: white;

    &:nth-child(2) {
      border-radius: 8px 0 0 8px;
    }

    &:nth-child(4) {
      border-radius: 0 8px 8px 0;
    }
  }

  .price_wrap {
    padding: 10px 20px;
    margin: 10px 0;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
  }

  .price {
    font-weight: bold;
  }

  .post_price {
    text-align: center;
  }

  .total_price {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-main);
    color: white;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 15px;
    font-weight: 700;
  }
`;

export const UserInfo = styled.article`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  label {
    display: inline-block;
    width: 82px;
  }

  input {
    margin-right: 10px;
  }
`;

export const AccountInfo = styled.article`
  .account_wrap {
    display: flex;
    gap: 30px;
  }

  .account_info {
    flex-grow: 3;
  }

  label {
    margin-right: 10px;
  }

  select {
    padding: 10px 15px;
    box-shadow: 0px 0px 3px 0px #6d6d6d4e;
    border-radius: 15px;
    border: none;
    font-family: var(--font-main);
    font-size: 15px;

    &:focus-visible {
      outline: none;
    }

    &:focus,
    &:active {
      outline: 2px solid var(--color-main);
    }
  }
`;

export const InputWrap = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
  }

  div {
    display: flex;
    align-items: center;
  }

  label {
    display: inline-block;
    min-width: 110px;
    max-width: 150px;
    margin-bottom: 25px;
  }

  input {
    margin-right: 30px;
  }
`;

export const DepositInfoWrap = styled.article`
  label {
    display: inline-block;
    width: 80px;
  }

  input {
    margin-right: 30px;
  }
`;
