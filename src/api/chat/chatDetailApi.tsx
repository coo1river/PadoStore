import axios from "axios";

export interface ChatReq {
  chat_room_id: string;
  limit: number;
  current_page: number;
}

export default async function chatDetailApi(data: ChatReq) {
  const url = "/api/chat/room";

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
