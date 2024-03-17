import axios from "axios";

export default async function searchApi() {
  const url = "/api/search";

  try {
    const res = await axios.get(url);
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
