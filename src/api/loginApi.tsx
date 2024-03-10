import axios from "axios";

interface Login {
  user_id: string;
  password: string;
}

const loginApi = async (data: Login) => {
  const url = "/api/login";
  try {
    const res = await axios.post<Login>(url, data);
    console.log("API 응답:", res.data);
    console.log(res.status);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default loginApi;
