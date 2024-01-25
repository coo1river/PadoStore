"use client";
import React from "react";
import {
  LogoImg,
  CommonHeader,
  SearchInput,
  LogoText,
  LogoDiv,
  LoginJoin,
  UploadBtns,
} from "@/styles/headerStyle";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  const handleClickHome = () => {
    router.push("/home");
  };

  const handleClickLogin = () => {
    router.push("/login");
  };

  const handleClickJoin = () => {
    router.push("/join");
  };

  return (
    <CommonHeader>
      <LogoText>
        <LogoDiv onClick={handleClickHome}>
          <LogoImg src="/assets/images/logo.png" alt="로고 이미지" />
          파도상점
        </LogoDiv>
      </LogoText>
      <div>
        <label htmlFor="search-input" />
        <SearchInput id="search-input" />
      </div>
      <UploadBtns>
        <button>판매 / 교환 </button>
        <span>|</span>
        <button>공동구매</button>
      </UploadBtns>
      <LoginJoin>
        <button onClick={handleClickLogin}>로그인</button>
        <button onClick={handleClickJoin}>회원가입</button>
      </LoginJoin>
    </CommonHeader>
  );
};

export default Header;
