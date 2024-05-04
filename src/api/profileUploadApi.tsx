import axios from "axios";

export default async function profileUploadApi(
  uploadfile: File | string | undefined,
  user_id: string | null
) {
  const url = "/api/profile/upload";
  const formData = new FormData();

  if (uploadfile) {
    formData.append("uploadfile", uploadfile);
  }
  formData.append("user_id", user_id || "");

  try {
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
