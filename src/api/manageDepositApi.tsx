import axios from "axios";

export interface ManageReq {
  post_id: number;
  limit: number;
  current_page: number;
  sort_by: string | null;
  order: string | null;
}

export default async function manageDepositApi(data: ManageReq) {
  const url = "/api/my-page/sale/manage/delivery";

  try {
    const res = await axios.get(url, { params: data });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
