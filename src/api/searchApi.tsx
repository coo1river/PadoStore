import axios from "axios";

export interface SearchReq {
  board_type: string | null;
  limit: number;
  current_page: number;
  sort_by: string | null;
  order: string | null;
  searchItem: string | undefined;
}

export default async function searchApi(tab: string, data: SearchReq) {
  let url: string;

  if (tab === "market") {
    url = "/api/search/market/list";
  } else if (tab === "group") {
    url = "/api/search/group-order/list";
  } else if (tab === "total") {
    url = "/api/search/total/list";
  } else {
    throw new Error("유효하지 않은 파라미터입니다.");
  }

  try {
    const res = await axios.get(url, { params: data });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
