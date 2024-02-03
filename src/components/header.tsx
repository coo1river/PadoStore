"use client";
import React, { useState } from "react";
import {
  LogoImg,
  CommonHeader,
  SearchInput,
  LogoText,
  LogoDiv,
  LoginJoin,
  SearchIptBox,
  UploadBtn,
  ModalWrap,
} from "@/styles/headerStyle";
import { useRouter } from "next/navigation";

// 글 등록 버튼 클릭 시 나오는 모달 창
const PostUploadModal: React.FC = () => {
  return (
    <ModalWrap>
      <ul>
        <li>
          <strong>판매 / 구매 / 교환</strong> 글 올리기
        </li>
        <li>
          <strong>공동구매 폼</strong> 올리기
        </li>
      </ul>
    </ModalWrap>
  );
};

const Header: React.FC = () => {
  // 라우터 사용
  const router = useRouter();

  // 모달 창 상태
  const [uploadModal, setUploadModal] = useState(false);

  const handleClickModal = () => {
    setUploadModal(!uploadModal);
  };

  // 버튼 클릭 시 해당 링크로 이동하는 함수
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
      <SearchIptBox>
        <label htmlFor="search-input" />
        <SearchInput id="search-input" />
        <button className="search_btn" />
      </SearchIptBox>
      <div>
        <UploadBtn onClick={handleClickModal}>글 등록▾</UploadBtn>
        {uploadModal ? <PostUploadModal /> : null}
      </div>
      <LoginJoin>
        <button onClick={handleClickLogin}>로그인</button>
        <button onClick={handleClickJoin}>회원가입</button>
      </LoginJoin>
    </CommonHeader>
  );
};

export default Header;
