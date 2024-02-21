import axios from "axios";

interface Nickname {
  nickname: string;
}

const NicknameValidApi = async (data: Nickname) => {
  const url = "api/nickname-check";

  try {
    const res = await axios.post<Nickname>(url, data);
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.log("API 오류:", error);
    throw error;
  }
};

export default NicknameValidApi;
