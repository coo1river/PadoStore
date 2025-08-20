import axios from "axios";

export default async function chatEnterApi(chat_room_id: number) {
  const url = "/api/chat/enter";

  try {
    const res = await axios.put(
      url,
      { chat_room_id },
      {
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      }
    );
    console.log("채팅방 입장:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
