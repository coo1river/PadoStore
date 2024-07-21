import iconNaver from "../../../public/assets/images/icon-naver.png";

export default function NaverLogin() {
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const STATE = process.env.NEXT_PUBLIC_NAVER_STATE;
  const REDIRECT_URI = "http://localhost:3000/login/naver";

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <button className="icon_naver" onClick={handleNaverLogin}>
      <img src={iconNaver.src} alt="네이버 로고" />
      네이버로 로그인
    </button>
  );
}
