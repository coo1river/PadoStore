import axios from "axios";

const uploadApi = async (file: File | null | undefined | string) => {
  const url = "/api/upload";

  try {
    const formData = new FormData();
    if (file) {
      formData.append("uploadfiles", file);
    }

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
};

export default uploadApi;
