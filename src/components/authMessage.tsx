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
  <div className="auth_wrap">
    <p>{message}</p>
    <LoginBtn onClick={onButtonClick}>{buttonText}</LoginBtn>
  </div>
);

export default AuthMessage;
