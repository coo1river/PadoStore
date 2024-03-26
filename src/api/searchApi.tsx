import axios from "axios";

export interface SearchReq {
  board_type: string | null;
  limit: number;
  current_page: number;
  sort_by: string | null;
  order: string | null;
  searchItem: string | undefined;
}

export default async function searchApi(data: SearchReq) {
  const url = "/api/search/market/list";
  console.log("데이터", data);

  try {
    const res = await axios.get(url, { params: data });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
