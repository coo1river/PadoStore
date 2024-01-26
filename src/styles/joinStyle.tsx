"use client";
import styled from "styled-components";
import { LoginMain } from "./loginStyle";

export const JoinMain = styled(LoginMain)`
  .text_join {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .join_form {
    width: 350px;
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
