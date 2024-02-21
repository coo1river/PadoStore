import axios from "axios";

interface IdData {
  user_id: string;
}
const idValidApi = async (data: IdData) => {
  const url = "api/id-check";

  try {
    const res = await axios.post<IdData>(url, data);
    console.log("API 응답:", res.data);
    return res.data ? "사용 가능한 아이디입니다." : "중복된 아이디입니다.";
  } catch (error) {
    console.log("API 오류:", error);
    throw error;
  }
};
export default idValidApi;
