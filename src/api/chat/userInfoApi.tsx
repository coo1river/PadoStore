import axios from "axios";

export interface UserInfo {
  user_id: string;
  user_name: string;
  phone_number: string;
  addr_post: string;
  addr_detail: string;
  bank: string;
  account_name: string;
  account_number: string;
}

export default async function chatDetailApi() {
  const url = "/api/chat/info";
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
