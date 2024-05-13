import axios from "axios";

export default async function kakaoLoginApi() {
  const KAKAO_REST_API_KEY = "1cc0476c3798bc77cbadaa1cb413e879";

  const KAKAO_REDIRECT_URI = "http://localhost:8080/";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  try {
    const res = await axios.get(KAKAO_AUTH_URL);
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
