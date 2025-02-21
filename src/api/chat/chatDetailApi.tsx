import axios from "axios";

export interface ChatReq {
  chat_room_id: number | undefined;
  limit: number;
  current_page: number;
}

interface Chat {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
  read_status: "true" | "false";
}

interface User {
  user_id: string;
  nickname: string;
  file_group_id: string | null;
  up_file: string | null;
}

export interface ChatDetail {
  chat: Chat[];
  user1: User;
  user2: User;
}

export default async function chatDetailApi(data: ChatReq) {
  const url = "/api/chat/room";

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
      params: data,
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
