import axios from "axios";

export interface ChatRes {
  chat_room_id: number;
  chat_room_status: string;
  chat_user1: string;
  chat_user2: string;
  insert_dt: string;
  update_dt: string;
}

export default async function createChatApi(receiver: string | string[]) {
  const url = "/api/chat/new";

  try {
    const res = await axios.post(url, receiver, {
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
