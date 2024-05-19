"use client";
import React, { KeyboardEvent, useState } from "react";
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
import IconChat from "@/../public/assets/svgs/messages.svg";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import ModalFilter from "./modal/modalFilter";
import useInput from "@/hooks/useInput";
import useDecodedToken from "@/hooks/useDecodedToken";

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

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const userId = useDecodedToken(token!);

  // 로그아웃 함수
  const handleLogout = () => {
    setAuthState(false);
    setToken(null);
    sessionStorage.removeItem("userToken");
    router.push("/home");
  };

  // 검색 키워드 저장
  const keywords = useInput("");

  // enter 키로 검색하기
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search/${keywords.value}`);
    }
  };

  return (
    <CommonHeader>
      <LogoText>
        <LogoDiv onClick={() => router.push("/home")}>
          <LogoImg src="/assets/images/logo.png" alt="로고 이미지" />
          파도상점
        </LogoDiv>
      </LogoText>

      {/* 검색 창 */}
      <SearchIptBox>
        <label htmlFor="search-input" />
        <SearchInput
          id="search-input"
          type="text"
          value={keywords.value}
          onChange={keywords.onChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => router.push(`/search/${keywords.value}`)}
          className="search_btn"
        />
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
          <button
            className="btn-chat"
            onClick={() => {
              router.push(`/chat/${userId}`);
            }}
          >
            <IconChat width="25" height="25" fill="#3EABFA" />
          </button>
          <button onClick={() => router.push(`/profile/${userId}/mySalesList`)}>
            프로필
          </button>
          <button onClick={handleLogout}>로그아웃</button>
        </LoginJoin>
      ) : (
        <LoginJoin>
          <div className="null"></div>
          <button onClick={() => router.push("/login")}>로그인</button>
          <button onClick={() => router.push("/join")}>회원가입</button>
        </LoginJoin>
      )}
    </CommonHeader>
  );
};

export default Header;
