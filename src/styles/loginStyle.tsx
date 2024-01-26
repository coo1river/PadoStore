"use client";
import styled from "styled-components";
import iconX from "../../public/assets/images/icon-x.png";
import iconKakao from "../../public/assets/images/icon-kakao.png";

export const LoginMain = styled.main`
  background-color: var(--color-trans-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 223px);
  color: #2c2c2c;

  .login_text {
    margin: 20px;
    font-size: 20px;
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
  font-size: 16px;
  background-color: transparent;

  &:focus {
    border-radius: 10px;
    outline: 2px solid var(--color-main);
  }
`;

export const LoginBtn = styled.button`
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
    margin: 0 auto;
  }

  button {
    width: 50px;
    height: 50px;
  }

  .icon_x {
    border-radius: 50px;
    background-image: url(${iconX.src});
    background-size: cover;
    margin-right: 10px;
  }

  .icon_kakao {
    background-image: url(${iconKakao.src});
    background-size: cover;
  }
`;
