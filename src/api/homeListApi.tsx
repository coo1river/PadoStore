import axios from "axios";

export default async function homeListApi(post_status: string) {
  const url = "/api/home/list";

  try {
    const res = await axios.get(url, {
      params: { post_status },
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
