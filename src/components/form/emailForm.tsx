import { FormEvent } from "react";
import useInput from "@/hooks/useInput";
import { ErrorMessage } from "@/styles/joinStyle";

interface PwFindProps {
  userId: ReturnType<typeof useInput>;
  errorMessage: string;
  onSubmit: (e: FormEvent) => void;
}

const PwFindForm: React.FC<PwFindProps> = ({
  userId,
  errorMessage,
  onSubmit,
}) => (
  <div className="find_wrap">
    <label htmlFor="email-input">아이디</label>
    <p className="infor_text">가입 시 입력하신 아이디를 입력해 주세요.</p>
    <input
      type="text"
      id="email-input"
      placeholder="이메일"
      onChange={userId.onChange}
      value={userId.value}
    />
    <button onClick={onSubmit}>인증</button>
    <ErrorMessage>{errorMessage}</ErrorMessage>
  </div>
);

export default PwFindForm;
