import axios from "axios";

export default async function createChatApi(receiver: string | string[]) {
  const url = "/api/chat/new";

  try {
    const res = await axios.post(
      url,
      { receiver },
      {
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      }
    );
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
