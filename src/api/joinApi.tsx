import axios from "axios";

export interface ReqData {
  user_id: string;
  password: string;
  user_name: string;
  nickname: string;
  email: string;
  phone_number: string;
  uploadfile: File | null;
}

const joinApi = async (data: ReqData) => {
  const url = "api/member/join";
  const formData = new FormData();
  formData.append("user_id", data.user_id);
  formData.append("password", data.password);
  formData.append("user_name", data.user_name);
  formData.append("nickname", data.nickname);
  formData.append("email", data.email);
  formData.append("phone_number", data.phone_number);
  formData.append("uploadfile", data.uploadfile || "");

  try {
    const res = await axios.post<ReqData>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default joinApi;
