import axios from "axios";
import { Res } from "./postDetailApi";

const updateApi = async (post_id: number, data?: any): Promise<Res> => {
  const url = `/api/update/${post_id}`;
  try {
    const res = await axios.put(url, data);
    console.log("API 성공", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default updateApi;
