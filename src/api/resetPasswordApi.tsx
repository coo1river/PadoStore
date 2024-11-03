import axios from "axios";

export default async function resetPasswordApi(
  token: string,
  password: string
) {
  const url = "/api/pw-reset";
  try {
    const res = await axios.post(url, { token, password });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
