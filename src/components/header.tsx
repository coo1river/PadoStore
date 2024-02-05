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

interface PostUploadModalProps {
  setUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// 글 등록 버튼 클릭 시 나오는 모달 창
const PostUploadModal: React.FC<PostUploadModalProps> = ({
  setUploadModal,
}) => {
  const router = useRouter();

  const handleModalOff = () => {
    setUploadModal(false);
  };

  return (
    <ModalWrap>
      <ul>
        <li
          onClick={() => {
            router.push("/upload/product");
            handleModalOff();
          }}
        >
          <strong>판매 / 구매 / 교환 글</strong> 올리기
        </li>
        <li
          onClick={() => {
            router.push("/upload/groupPurchase");
            handleModalOff();
          }}
        >
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

  return (
    <CommonHeader>
      <LogoText>
        <LogoDiv onClick={() => router.push("/home")}>
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
        {uploadModal ? (
          <PostUploadModal setUploadModal={setUploadModal} />
        ) : null}
      </div>
      <LoginJoin>
        <button onClick={() => router.push("/login")}>로그인</button>
        <button onClick={() => router.push("/join")}>회원가입</button>
      </LoginJoin>
    </CommonHeader>
  );
};

export default Header;
