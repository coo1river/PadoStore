import axios from "axios";

interface Params {
  user_id: string | null;
  board_type: string;
  post_status: string;
  limit: number;
  current_page: number;
  sort_by: string;
  order: string;
}

export default async function mySalesListApi(type: string, data: Params) {
  let url;

  if (type === "market") {
    url = "/api/my-page/market/list";
  } else if (type === "group") {
    url = "/api/my-page/group-order/list";
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
