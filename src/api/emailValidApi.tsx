import axios from "axios";

interface EmailData {
  email: string;
}

const emailValidApi = async (data: EmailData) => {
  const url = "api/email-check";
  try {
    const res = await axios.post<EmailData>(url, data);

    console.log("API 응답:", res.data);
    return res.data ? "사용 가능한 이메일입니다." : "중복된 이메일입니다.";
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};
export default emailValidApi;
