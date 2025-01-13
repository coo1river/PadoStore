import axios from "axios";

export default async function verifyCodeApi(email: string, code: string) {
  const url = "/api/code/verify";

  try {
    const res = await axios.post(url, { email, code });
    console.log("API 응답:", res.data);
    return res.data, res.headers.authorization;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
