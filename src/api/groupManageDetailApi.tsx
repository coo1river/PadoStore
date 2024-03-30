import axios from "axios";

export default async function groupManageDetailApi(
  order_id: number,
  post_number: string
) {
  const url = `/api/my-page/sale/manage/${order_id}`;

  try {
    const res = await axios.get(url, { params: post_number });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
