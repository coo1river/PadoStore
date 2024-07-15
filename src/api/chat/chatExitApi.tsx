import axios from "axios";

export default async function chatExitApi(chat_room_id: number | undefined) {
  const url = "/api/chat/exit";

  try {
    const res = await axios.post(url, {
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
      chat_room_id,
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
