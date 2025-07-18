import { ChatDetailReq, ChatDetailRes } from "@/types/chat/chat.types";
import axios from "axios";

export default async function chatDetailApi(
  data: ChatDetailReq
): Promise<ChatDetailRes> {
  const url = "/api/chat/room";

  try {
    const res = await axios.get<ChatDetailRes>(url, {
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
