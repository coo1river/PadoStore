import emailValidApi from "@/api/emailValidApi";
import idValidApi from "@/api/idValidApi";
import { ReqData } from "@/api/joinApi";
import { useState } from "react";

interface Error {
  idErr: string | { user_id: string };
  emailErr: string | { email: string };
  pwErr: string;
  pwCheckErr: string;
  userNameErr: string;
}

interface Data {
  email: string;
  id: string;
}

const useValid = (form: ReqData): Error => {
  // 에러 메시지 관리
  const [error, setError] = useState<Error>({
    idErr: "",
    emailErr: "",
    pwErr: "",
    pwCheckErr: "",
    userNameErr: "",
  });

  // id 조건 정규 표현식
  const idReg = /^[a-z]+[a-z0-9]{4,11}$/;

  // id 유효성 검사 함수
  const IdValid = async () => {
    if (!form.user_id) {
      setError({ ...error, idErr: "필수 입력 항목입니다." });
    }
    if (!idReg.test(form.user_id)) {
      setError({ ...error, idErr: "유효한 아이디 형식이 아닙니다." });
    }
    if (form.user_id.length < 2) {
      setError({ ...error, idErr: "5자 이상 입력해 주세요." });
    }
    if (form.user_id.length > 13) {
      setError({ ...error, idErr: "12자 이하의 아이디만 가능합니다." });
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
    }
    if (!emailReg.test(form.email)) {
      setError({ ...error, emailErr: "이메일 형식이 올바르지 않습니다." });
    } else {
      const emailValid = await emailValidApi({ email: form.email });
      setError({ ...error, emailErr: emailValid });
    }
  };

  return error;
};

export default useValid;
