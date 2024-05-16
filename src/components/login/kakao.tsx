export default function KakaoLogin() {
  const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.KAKAO_CLIENT_SECRET;

  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&
  redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = url;
  };
  return handleLogin;
}
