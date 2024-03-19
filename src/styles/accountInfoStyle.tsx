import styled from "styled-components";

export const AccountInfoWrap = styled.section`
  margin: 50px 0;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 4px 0px #b4b4b44e;

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
  }

  input {
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

export const ProductSelect = styled.article`
  li {
    font-weight: 600;
    font-size: 14px;
    background-color: #e1e1e14e;
    padding: 8px 20px;
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

  button {
    padding: 5px 12px;
    background-color: var(--color-main);
    color: white;

    &:first-child {
      border-radius: 8px 0 0 8px;
    }

    &:nth-child(3) {
      border-radius: 0 8px 8px 0;
    }
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
