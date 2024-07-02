import axios from "axios";

export interface chatRoomRes {
  chat_room_id: number;
  user_id: string;
  user_status: string;
}

export default async function chatEnterApi(chat_room_id: number) {
  const url = "/api/chat/enter";

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
