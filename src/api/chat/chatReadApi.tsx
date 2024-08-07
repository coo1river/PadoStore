import axios from "axios";

export default async function chatReadApi() {
  const url = "/api/chat/update";

  try {
    const res = await axios.put(url, {
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
