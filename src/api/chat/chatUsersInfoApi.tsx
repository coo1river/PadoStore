import axios from "axios";

export interface ChatRoomRes {
  chat_room_id: number;
  user1_id: string;
  user2_id: string;
  user1_status: "online" | "offline";
  user2_status: "online" | "offline";
}

export default async function chatUsersInfoApi(chat_room_id: number) {
  const url = "/api/chat/users/info";

  try {
    const res = await axios.get(url, {
      params: { chat_room_id },
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
    });
    console.log("채팅방 입장:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
