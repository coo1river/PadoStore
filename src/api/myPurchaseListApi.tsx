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

export default async function myPurchaseListApi(type: string, data: Params) {
  let url: string;

  if (type === "market") {
    url = "/api/my-page/deal/market/list";
  } else if (type === "group") {
    url = "/api/my-page/deal/group-order/list";
  } else {
    throw new Error("유효하지 않은 타입입니다.");
  }

  try {
    const res = await axios.get(url, {
      params: data,
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
