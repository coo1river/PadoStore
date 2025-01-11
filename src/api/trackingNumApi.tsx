import axios from "axios";

export default async function trackingNumApi(
  order_id: number | undefined,
  post_id: string | undefined
) {
  const url = "/api/my-page/sale/manage/update";

  try {
    const res = await axios.put(
      url,
      {
        order_id,
        post_id,
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
