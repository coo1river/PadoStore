"use client";
import styled from "styled-components";

export const LoginMain = styled.main`
  background-color: var(--color-trans-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #2c2c2c;
  height: calc(100vh - 215px);

  .login_text {
    margin: 25px;
    font-size: 18px;
    font-weight: 700;
  }

  .text_join {
    display: flex;
    align-items: center;

    p {
      margin-top: 1px;
    }
  }

  .btn_join {
    font-weight: 700;
    margin: 0 auto;
    width: fit-content;
    color: #2c2c2c;
  }

  form {
    margin-bottom: 20px;
    width: 400px;
    display: flex;
    flex-direction: column;

    .login_ipt_wrap {
      border: 2px solid var(--color-lightgrey);
      background-color: white;
      border-radius: 10px;
    }

    .input_wrap {
      display: flex;

      p {
        margin-right: 20px;
      }
    }
  }
`;

export const LoginInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 14px;
  background-color: transparent;

  &:focus {
    border-radius: 10px;
    outline: 2px solid var(--color-main);
  }
`;

export const LoginBtn = styled.button`
  font-weight: 700;
  margin: 20px 0;
  padding: 15px;
  background-color: var(--color-main);
  color: white;
  border-radius: 10px;
`;

export const SnsLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin: 40px 0 20px 0;

    &::before {
      content: "";
      width: 7.5rem;
      height: 1px;
      margin: 5px 5px 5px 0;
      display: inline-block;
      border-bottom: 1px solid #b6b6b6;
    }

    &::after {
      content: "";
      width: 7.5rem;
      height: 1px;
      margin: 5px 0 5px 5px;
      display: inline-block;
      border-bottom: 1px solid #b6b6b6;
    }
  }

  .btn_wrap {
    display: flex;
    margin: 0 auto;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    font-size: 15px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
  }

  .icon_kakao {
    color: #353535;
    margin-right: 10px;
    background-color: #ffeb3b;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .icon_naver {
    background-color: #03c75a;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;
