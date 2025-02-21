import { AuthWrap } from "@/styles/joinStyle";
import { LoginBtn } from "@/styles/loginStyle";

interface AuthMessageProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const AuthMessage: React.FC<AuthMessageProps> = ({
  message,
  buttonText,
  onButtonClick,
}) => (
  <AuthWrap>
    <p>
      회원님의 아이디는 <strong>{message}</strong>입니다.
    </p>
    <LoginBtn onClick={onButtonClick}>{buttonText}</LoginBtn>
  </AuthWrap>
);

export default AuthMessage;
