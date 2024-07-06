import axios from "axios";

export default async function chatDelete(chat_room_id: number) {
  const url = "/api/chat/delete";

  try {
    const res = await axios.put(url, {
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
