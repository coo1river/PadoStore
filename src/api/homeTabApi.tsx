import axios from "axios";

interface HomeTabParams {
  board_type: string;
  limit: number;
  current_page: number;
  sort_by: string;
  order: string;
}

export default async function homeTabApi(tab: string, params: HomeTabParams) {
  let url: string;

  if (tab === "market") {
    url = "/api/board/market/list";
  } else if (tab === "group") {
    url = "/api/board/group-order/list";
  } else {
    throw new Error("유효하지 않은 파라미터입니다.");
  }

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
