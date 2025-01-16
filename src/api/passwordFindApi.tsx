import axios from "axios";

export default async function pwFindApi(userId: string) {
  const url = "/api/pw-find";

  try {
    const res = await axios.post(url, { userId });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
