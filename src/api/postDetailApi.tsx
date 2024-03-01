import axios from "axios";

const postDetailApi = async (board_status: string, post_id: number) => {
  const url = `/api/board/${board_status}/${post_id}`;
  try {
    const res = await axios.get(url);
    console.log("API 성공", res.status);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default postDetailApi;
