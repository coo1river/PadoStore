import axios from "axios";

export default async function reviewListApi() {
  const url = "/api/my-page/review";

  try {
    const res = await axios.post(url, {
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
