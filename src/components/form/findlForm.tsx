import useInput from "@/hooks/useInput";
import { ErrorMessage } from "@/styles/joinStyle";
import { FormEvent } from "react";

interface FindFormProps {
  label: string;
  placeholder: string;
  infoText: string;
  inputProps: ReturnType<typeof useInput>;
  errorMessage: string;
  onSubmit: (e: FormEvent) => void;
}

const FindForm: React.FC<FindFormProps> = ({
  label,
  placeholder,
  infoText,
  inputProps,
  errorMessage,
  onSubmit,
}) => (
  <div className="find_wrap">
    <label htmlFor="input-field">{label}</label>
    <p className="infor_text">가입 시 입력하신 {infoText}를 입력해 주세요.</p>
    <input
      type="text"
      id="input-field"
      placeholder={placeholder}
      onChange={inputProps.onChange}
      value={inputProps.value}
    />
    <button onClick={onSubmit}>인증</button>
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
);

export default FindForm;
