import axios from "axios";

export default async function deliveryManageApi(
  order_id: number | undefined,
  order_status?: string | undefined,
  post_number?: string | undefined
) {
  const url = "/api/my-page/sale/manage/update";

  try {
    const res = await axios.put(
      url,
      {
        order_id,
        order_status,
        post_number,
      },
      {
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      }
    );
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
