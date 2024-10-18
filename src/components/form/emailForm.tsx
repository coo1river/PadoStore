import { FormEvent } from "react";
import useInput from "@/hooks/useInput";
import { ErrorMessage } from "@/styles/joinStyle";

interface EmailFormProps {
  email: ReturnType<typeof useInput>;
  errorMessage: string;
  onSubmit: (e: FormEvent) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({
  email,
  errorMessage,
  onSubmit,
}) => (
  <div className="find_wrap">
    <label htmlFor="email-input">이메일</label>
    <p className="infor_text">가입 시 입력하신 이메일을 입력해 주세요.</p>
    <input
      type="text"
      id="email-input"
      placeholder="이메일"
      onChange={email.onChange}
      value={email.value}
    />
    <button onClick={onSubmit}>인증</button>
    <ErrorMessage>{errorMessage}</ErrorMessage>
  </div>
);

export default EmailForm;
