import emailValidApi from "@/api/emailValidApi";
import idValidApi from "@/api/idValidApi";
import { useState } from "react";

interface Error {
  idErr: string | { user_id: string };
  emailErr: string | { email: string };
  pwErr: string;
  pwCheckErr: string;
  nicknameErr: string;
  userNameErr: string;
  numberErr: string;
}

interface Data {
  email: string;
  user_id: string;
  password: string;
  pwCheck: string;
  user_name: string;
  nickname: string;
  number: string;
}

const useValid = (
  form: Data
): {
  error: Error;
  IdValid: () => void;
  EmailValid: () => void;
  PwValid: () => void;
  PwCheckValid: () => void;
  NicknameValid: () => void;
  UserNameValid: () => void;
  NumberValid: () => void;
} => {
  // 에러 메시지 관리
  const [error, setError] = useState<Error>({
    idErr: "",
    emailErr: "",
    pwErr: "",
    pwCheckErr: "",
    nicknameErr: "",
    userNameErr: "",
    numberErr: "",
  });

  // id 조건 정규 표현식
  const idReg = /^[a-z]+[a-z0-9]{4,11}$/;

  // id 유효성 검사 함수
  const IdValid = async () => {
    if (!form.user_id) {
      setError({ ...error, idErr: "필수 입력 항목입니다." });
    } else if (form.user_id.length < 5) {
      setError({ ...error, idErr: "5자 이상 입력해 주세요." });
    } else if (form.user_id.length > 12) {
      setError({ ...error, idErr: "12자 이하의 아이디만 가능합니다." });
    } else if (!idReg.test(form.user_id)) {
      setError({ ...error, idErr: "유효한 아이디 형식이 아닙니다." });
    } else {
      const IdValid = await idValidApi({ user_id: form.user_id });
      setError({ ...error, idErr: IdValid });
    }
  };

  // email 조건 정규 표현식
  const emailReg = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  // email 유효성 검사 함수
  const EmailValid = async () => {
    if (!form.email) {
      setError({ ...error, emailErr: "필수 입력 항목입니다." });
    } else if (!emailReg.test(form.email)) {
      setError({ ...error, emailErr: "이메일 형식이 올바르지 않습니다." });
    } else {
      const emailValid = await emailValidApi({ email: form.email });
      setError({
        ...error,
        emailErr: emailValid,
      });
    }
  };

  // password 조건 정규표현식
  const pwReg = /^(?=.*[a-z])(?=.*\d)(?=.*[@!#$~]).{6,16}$/;

  // password 유효성 검사 함수
  const PwValid = () => {
    if (!form.password) {
      setError({ ...error, pwErr: "필수 입력 항목입니다." });
    } else if (!pwReg.test(form.password)) {
      setError({ ...error, pwErr: "비밀번호 형식이 맞지 않습니다." });
    } else if (form.password.length < 5) {
      setError({ ...error, pwErr: "6자 이상 입력해 주세요." });
    } else if (form.password.length > 17) {
      setError({ ...error, pwErr: "16자 이하로 입력해 주세요." });
    } else {
      setError({ ...error, pwErr: "" });
    }
  };

  // password check 유효성 검사 함수
  const PwCheckValid = () => {
    if (!form.pwCheck) {
      setError({ ...error, pwCheckErr: "필수 입력 항목입니다." });
    } else if (form.password !== form.pwCheck) {
      setError({ ...error, pwCheckErr: "비밀번호가 일치하지 않습니다." });
    } else {
      setError({ ...error, pwCheckErr: "" });
    }
  };

  const NicknameValid = () => {
    if (!form.nickname) {
      setError({ ...error, nicknameErr: "필수 입력 항목입니다." });
    } else if (form.nickname.length < 3) {
      setError({ ...error, nicknameErr: "3자 이상 입력해 주세요." });
    } else if (form.nickname.length > 10) {
      setError({ ...error, nicknameErr: "10자까지 입력 가능합니다." });
    }
  };

  // 유저 이름 조건(한글 혹은 영문) 정규 표현식
  const nameReg = /^[가-힣a-zA-Z]+$/;

  // 유저 이름 유효성 검사 함수
  const UserNameValid = () => {
    if (!form.user_name) {
      setError({ ...error, userNameErr: "필수 입력 항목입니다." });
    } else if (!nameReg.test(form.user_name)) {
      setError({ ...error, userNameErr: "한글 혹은 영문만 입력 가능합니다." });
    } else setError({ ...error, userNameErr: "" });
  };

  // 휴대폰 번호 유효성 검사 함수
  const NumberValid = () => {
    if (!form.number) {
      setError({ ...error, numberErr: "필수 입력 항목입니다." });
    } else if (isNaN(Number(form.number))) {
      setError({ ...error, numberErr: "숫자만 입력 가능합니다." });
    } else {
      setError({ ...error, numberErr: "" });
    }
  };

  return {
    error,
    EmailValid,
    IdValid,
    PwValid,
    PwCheckValid,
    NicknameValid,
    UserNameValid,
    NumberValid,
  };
};

export default useValid;
