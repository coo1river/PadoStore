import { ChatUserInfo } from "@/types/chat/chat.types";
import axios from "axios";

export default async function userInfoApi() {
  const url = "/api/chat/info";
  try {
    const res = await axios.get<ChatUserInfo>(url, {
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
