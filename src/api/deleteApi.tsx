import axios from "axios";

export default async function deleteApi(
  post_id: number,
  file_group_id: string | undefined
) {
  const url = "/api/board/delete";

  try {
    const res = await axios.delete(url, {
      data: {
        post_id: post_id,
        file_group_id: file_group_id,
      },
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
