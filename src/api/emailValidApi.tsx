import axios from "axios";

interface EmailData {
  email: string;
}

const emailValidApi = async (data: EmailData) => {
  const url = "api/member/id-check";

  try {
    const res = await axios.post<EmailData>(url, data);

    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};
export default emailValidApi;
