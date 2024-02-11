"use client";
import styled from "styled-components";
import { LoginMain } from "./loginStyle";

export const JoinMain = styled(LoginMain)`
  height: unset;

  .text_h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 30px 0;
  }

  .join_form {
    width: 350px;
    padding-bottom: 30px;
  }

  label {
    margin-bottom: 10px;
    font-weight: 500;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    outline: 2px solid #e4e4e4;
    margin-bottom: 25px;
  }

  input:focus {
    outline: 2px solid var(--color-main);
  }

  .addr_wrap {
    display: flex;
    align-items: center;
  }

  .btn_join {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    background-color: var(--color-main);
    color: white;
  }
`;

export const SetProfileMain = styled(JoinMain)`
  justify-content: start;
`;

export const SetProfileForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ImgLabel = styled.label`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  box-shadow: 0px 0px 4px 0px #0000002f;
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 50%;
`;

export const ImgInput = styled.input`
  display: none;
`;
