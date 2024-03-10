import axios from "axios";

interface HomeTabParams {
  board_type: string;
  limit: number;
  current_page: number;
}

export default async function homeTabApi(params: HomeTabParams) {
  const url = "/api/board/list";

  try {
    const res = await axios.get(url, {
      params: params,
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
