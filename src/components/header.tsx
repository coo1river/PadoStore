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
import useAuthStore from "@/store/useAuthStore";
import ModalFilter from "./modal/modalFilter";

interface PostUploadModalProps {
  setUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// 글 등록 버튼 클릭 시 나오는 모달 창
const PostUploadModal: React.FC<PostUploadModalProps> = ({
  setUploadModal,
}) => {
  // 라우터 사용
  const router = useRouter();

  // 모달 창 끄기
  const handleModalOff = () => {
    setUploadModal(false);
  };

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  return (
    <ModalWrap>
      <ul>
        <li
          onClick={() => {
            token ? router.push("/upload/product") : router.push("/login");
            handleModalOff();
          }}
        >
          <strong>판매 / 구매 / 교환 글</strong> 올리기
        </li>
        <li
          onClick={() => {
            token
              ? router.push("/upload/groupPurchase")
              : router.push("/login");
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

  // zustand에서 관리하는 authState로 로그인 상태 확인
  const { authState, setAuthState } = useAuthStore();
  const { token, setToken } = useAuthStore();

  const handleLogout = () => {
    setAuthState(false);
    setToken(null);
    sessionStorage.removeItem("userToken");
    router.push("/home");
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
        <button onClick={() => router.push("/search")} className="search_btn" />
      </SearchIptBox>
      <div>
        <UploadBtn onClick={handleClickModal}>글 등록▾</UploadBtn>
        {uploadModal ? (
          <ModalFilter onClose={handleClickModal}>
            <PostUploadModal setUploadModal={setUploadModal} />
          </ModalFilter>
        ) : null}
      </div>
      {authState ? (
        <LoginJoin>
          <button onClick={() => router.push(`/profile/${token}`)}>
            프로필
          </button>
          <button onClick={handleLogout}>로그아웃</button>
        </LoginJoin>
      ) : (
        <LoginJoin>
          <button onClick={() => router.push("/login")}>로그인</button>
          <button onClick={() => router.push("/join")}>회원가입</button>
        </LoginJoin>
      )}
    </CommonHeader>
  );
};

export default Header;
