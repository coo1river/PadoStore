import axios from "axios";

export default async function accountFindApi(type: "id" | "pw", email: string) {
  const url = type === "id" ? "/api/id-find" : "/api/pw-find";

  try {
    const res = await axios.post(url, { email });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
