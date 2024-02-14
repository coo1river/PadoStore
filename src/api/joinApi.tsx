import axios, { AxiosResponse, AxiosError } from "axios";

interface ReqData {
  user_id: string;
  password: string;
  user_name: string;
  phone_number: string;
  up_file: string | null;
}

interface ResData {
  user_id: string;
  password: string;
  user_name: string;
  nickname: string;
  phone_number: string;
  addr_post: null | string;
  addr: null | string;
  addr_detail: null | string;
  bank: null | string;
  account_name: null | string;
  account_number: null | string;
  file_group_id: string;
  file_id: number;
  org_file: string;
  up_file: string;
}

const joinApi = async (data: ReqData) => {
  const url = "/api/member/join";
  const formData = new FormData();
  formData.append("user_id", data.user_id);
  formData.append("password", data.password);
  formData.append("user_name", data.user_name);
  formData.append("phone_number", data.phone_number);
  formData.append("up_file", data.up_file || "");

  try {
    const res = await axios.post<ResData>(url, formData, {
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
