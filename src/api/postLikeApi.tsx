import axios from "axios";

export default async function postLikeApi(post_id: number | undefined) {
  const url = "/api/favorite";

  try {
    const res = await axios.post(url, {
      post_id: post_id,
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
