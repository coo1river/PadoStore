"use client";

// 리액트 훅 import
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { useRouter } from "next/navigation";

// 스타일 import
import {
  ErrorMessage,
  ImgInput,
  ImgLabel,
  ImgProfile,
  ImgWrap,
  InfoText,
  JoinMain,
} from "@/styles/joinStyle";

// 기본 프로필 이미지 import
import ImgProfileBasic from "../../../public/assets/images/img-user-basic.png";

// 커스텀 훅, api import
import useInput from "@/hooks/useInput";
import joinApi from "@/api/joinApi";
import useValid from "@/hooks/useValid";

const Join: React.FC = () => {
  // 라우터 사용
  const router = useRouter();

  // 프로필 이미지 useState 값으로 저장
  const [imgProfile, setImgProfile] = useState<File | null>(null);

  // useRef 사용
  const InputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경 함수
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImgProfile(selectedFile);
    }
  };

  // useInput으로 value, onChange 할당
  const form = {
    id: useInput(""),
    password: useInput(""),
    pwCheck: useInput(""),
    nickname: useInput(""),
    email: useInput(""),
    username: useInput(""),
    number: useInput(""),
  };

  const {
    error,
    joinableState,
    EmailValid,
    IdValid,
    PwValid,
    PwCheckValid,
    NicknameValid,
    UserNameValid,
    NumberValid,
  } = useValid({
    email: form.email.value,
    user_id: form.id.value,
    password: form.password.value,
    pwCheck: form.pwCheck.value,
    user_name: form.username.value,
    nickname: form.nickname.value,
    number: form.number.value,
  });

  // 회원가입 api 통신
  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await joinApi({
        user_id: form.id.value,
        password: form.password.value,
        user_name: form.username.value,
        nickname: form.nickname.value,
        email: form.email.value,
        phone_number: form.number.value,
        uploadfile: imgProfile,
      });
      console.log("가입 성공", data);
      router.push("/login");
    } catch (error) {
      console.error("가입 실패", error);
    }
  };

  return (
    <JoinMain>
      <h2 className="heading">회원가입</h2>
      <form className="join_form">
        {/* 프로필 이미지 업로드 */}
        <ImgWrap>
          <ImgProfile
            src={
              imgProfile ? URL.createObjectURL(imgProfile) : ImgProfileBasic.src
            }
          />
          <ImgLabel htmlFor="img-profile" />
          <ImgInput
            type="file"
            id="img-profile"
            accept="image/*"
            onChange={onChangeFile}
            ref={InputRef}
          />
        </ImgWrap>

        {/* 아이디 입력 */}
        <label htmlFor="input-id">아이디</label>
        <InfoText>5자 - 12자</InfoText>
        <input
          type="text"
          id="input-id"
          placeholder="아이디"
          onChange={form.id.onChange}
          value={form.id.value}
          onBlur={IdValid}
        />
        <ErrorMessage>{error.idErr as string}</ErrorMessage>

        {/* 비밀번호 입력 */}
        <label htmlFor="input-pw">비밀번호</label>
        <InfoText>
          영소문자, 숫자, 특수문자(@, !, #, $)를 포함한 6자 - 16자
        </InfoText>
        <input
          type="password"
          id="input-pw"
          placeholder="비밀번호"
          onChange={form.password.onChange}
          value={form.password.value}
          onBlur={PwValid}
        />
        <ErrorMessage>{error.pwErr as string}</ErrorMessage>

        {/*  비밀번호 확인 입력 */}
        <label htmlFor="input-pw">비밀번호 확인</label>
        <input
          type="password"
          id="input-pwchk"
          placeholder="비밀번호 확인"
          onChange={form.pwCheck.onChange}
          value={form.pwCheck.value}
          onBlur={PwCheckValid}
        />
        <ErrorMessage>{error.pwCheckErr as string}</ErrorMessage>

        {/* 닉네임 입력 */}
        <label htmlFor="input-nic">닉네임</label>
        <InfoText>2자 - 10자</InfoText>
        <input
          type="text"
          id="input-nic"
          placeholder="닉네임"
          onChange={form.nickname.onChange}
          value={form.nickname.value}
          onBlur={NicknameValid}
        />
        <ErrorMessage>{error.nicknameErr as string}</ErrorMessage>

        {/* 이메일 입력 */}
        <label htmlFor="input-email">이메일</label>
        <input
          type="text"
          id="input-email"
          placeholder="이메일"
          onChange={form.email.onChange}
          value={form.email.value}
          onBlur={EmailValid}
        />
        <ErrorMessage>{error.emailErr as string}</ErrorMessage>

        {/* 이름 입력 */}
        <label htmlFor="input-pw">이름</label>
        <input
          type="text"
          id="input-name"
          placeholder="이름"
          onChange={form.username.onChange}
          value={form.username.value}
          onBlur={UserNameValid}
        />
        <ErrorMessage>{error.userNameErr as string}</ErrorMessage>

        {/* 전화번호 입력 */}
        <label htmlFor="input-num">전화번호</label>
        <input
          type="text"
          id="input-num"
          placeholder="전화번호"
          onChange={form.number.onChange}
          value={form.number.value}
          onBlur={NumberValid}
        />
        <ErrorMessage>{error.numberErr as string}</ErrorMessage>

        <button
          className="btn_join"
          onClick={handleJoin}
          disabled={!joinableState}
        >
          회원가입
        </button>
      </form>
    </JoinMain>
  );
};

export default Join;
