"use client";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";

// 커스텀 훅, api import
import useInput from "@/hooks/useInput";
import useValid from "@/hooks/useValid";
import editProfileApi, { EditRes } from "@/api/editProfileApi";
import useAuthStore from "@/store/useAuthStore";
import profileUploadApi from "@/api/profileUploadApi";
import useDecodedToken from "@/hooks/useDecodedToken";

const EditProfile: React.FC = () => {
  // 라우터 사용
  const router = useRouter();

  // zustand에서 token 가져오기
  const { token } = useAuthStore();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const userId = useDecodedToken(token!);

  const [data, setData] = useState<EditRes | null>(null);

  // 최초 렌더링 시 프로필 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      const res = await editProfileApi("get");
      setData(res);
    };
    getData();
  }, []);

  // 프로필 이미지 useState 값으로 저장
  const [imgProfile, setImgProfile] = useState<string | File | undefined>("");

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

  useEffect(() => {
    form.id.setValue(data?.user.user_id || "");
    form.nickname.setValue(data?.user.nickname || "");
    form.email.setValue(data?.user.email || "");
    form.username.setValue(data?.user.user_name || "");
    form.number.setValue(data?.user.phone_number || "");
  }, [data]);

  useEffect(() => {
    data?.userFile && data?.userFile.up_file
      ? setImgProfile(data?.userFile.up_file)
      : setImgProfile(ImgProfileBasic.src);
  }, [data?.userFile]);

  const {
    error,
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

  //  프로필 수정 api 통신
  const handleEditProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 이미지 업로드와 프로필 수정을 병렬로 실행
      await Promise.all([
        profileUploadApi(imgProfile, userId),
        editProfileApi("put", {
          user: {
            user_id: form.id.value,
            password: form.password.value,
            user_name: form.username.value,
            nickname: form.nickname.value,
            phone_number: form.number.value,
            email: form.email.value,
          },
        }),
      ]);

      console.log("수정 성공");
      router.push(`/profile/${userId}`);
    } catch (error) {
      console.error("수정 실패", error);
    }
  };

  return (
    <JoinMain>
      <h2 className="heading">프로필 수정</h2>
      <form className="join_form">
        {/* 프로필 이미지 업로드 */}
        <ImgWrap>
          <ImgProfile
            src={
              data?.user && data?.userFile.up_file
                ? `/api/file/${data?.userFile.up_file}`
                : ImgProfileBasic.src
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
          value={form.id.value}
          disabled
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
          value={form.password.value}
          onChange={form.password.onChange}
          onBlur={PwValid}
        />
        <ErrorMessage>{error.pwErr as string}</ErrorMessage>

        {/*  비밀번호 확인 입력 */}
        <label htmlFor="input-pw">비밀번호 확인</label>
        <input
          type="password"
          id="input-pwchk"
          placeholder="비밀번호 확인"
          value={form.pwCheck.value}
          onChange={form.pwCheck.onChange}
          onBlur={PwCheckValid}
        />
        <ErrorMessage>{error.pwCheckErr as string}</ErrorMessage>

        {/* 닉네임 입력 */}
        <label htmlFor="input-nic">닉네임</label>
        <InfoText>3자 - 10자</InfoText>
        <input
          type="text"
          id="input-nic"
          placeholder="닉네임"
          value={form.nickname.value}
          onChange={form.nickname.onChange}
          onBlur={NicknameValid}
        />
        <ErrorMessage>{error.nicknameErr as string}</ErrorMessage>

        {/* 이메일 입력 */}
        <label htmlFor="input-email">이메일</label>
        <input
          type="text"
          id="input-email"
          placeholder="이메일"
          value={form.email.value}
          onChange={form.email.onChange}
          onBlur={EmailValid}
        />
        <ErrorMessage>{error.emailErr as string}</ErrorMessage>

        {/* 이름 입력 */}
        <label htmlFor="input-pw">이름</label>
        <input
          type="text"
          id="input-name"
          placeholder="이름"
          value={form.username.value}
          onChange={form.username.onChange}
          onBlur={UserNameValid}
        />
        <ErrorMessage>{error.userNameErr as string}</ErrorMessage>

        {/* 전화번호 입력 */}
        <label htmlFor="input-num">전화번호</label>
        <input
          type="number"
          id="input-num"
          placeholder="전화번호"
          value={form.number.value}
          onChange={form.number.onChange}
          onBlur={NumberValid}
        />
        <ErrorMessage>{error.numberErr as string}</ErrorMessage>

        <button onClick={handleEditProfile} className="btn_join">
          수정하기
        </button>
      </form>
    </JoinMain>
  );
};

export default EditProfile;
