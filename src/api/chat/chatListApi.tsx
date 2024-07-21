import axios from "axios";

interface ChatRoom {
  chat_room_id: number;
  chat_user1: string;
  chat_user2: string;
  last_insert_dt: string;
  last_message: string;
  nickname: string;
  path: string | null;
  unread_count: number;
  up_file: string;
  user1_status: boolean;
  user2_status: boolean;
}

export interface ListRes {
  chatList: ChatRoom[];
}

export default async function chatListApi() {
  const url = "/api/chat/list";

  try {
    const res = await axios.get(url, {
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
