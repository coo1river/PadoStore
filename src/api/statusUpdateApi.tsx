import axios from "axios";

export default async function statusUpdateApi(
  post_id: number,
  post_status: string
) {
  const url = "/api/post/status/update";

  try {
    const res = await axios.put(url, {
      post_id,
      post_status,
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
