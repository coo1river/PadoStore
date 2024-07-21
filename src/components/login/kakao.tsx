import iconKakao from "../../../public/assets/images/icon-kakao.png";

export default function KakaoLogin() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/login/kakao";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <button className="icon_kakao" onClick={handleKakaoLogin}>
      <img src={iconKakao.src} alt="카카오 로고" />
      카카오로 로그인
    </button>
  );
}
