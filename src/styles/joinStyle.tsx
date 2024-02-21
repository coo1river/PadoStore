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
    margin-bottom: 5px;
    font-weight: 700;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    outline: 2px solid #e4e4e4;
  }

  input:focus {
    outline: 2px solid var(--color-main);
  }

  .addr_wrap {
    display: flex;
    align-items: center;
  }

  .btn_check {
    margin-left: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-main);
    color: white;
    font-weight: 500;
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

export const ImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
`;

export const ImgProfile = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto;
`;

export const ImgLabel = styled.label`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  box-shadow: 0px 0px 4px 0px #0000002f;
  width: 120px;
  height: 120px;
  border-radius: 50%;

  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export const ImgInput = styled.input`
  display: none;
`;

export const InfoText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #808080;
`;

export const ErrorMessage = styled.p`
  display: block;
  color: red;
  margin: 10px 0 15px 0;
  font-size: 14px;
`;
