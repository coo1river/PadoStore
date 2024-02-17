import axios from "axios";

interface IdData {
  user_id: string;
}
const idValidApi = async (data: IdData) => {
  const url = "api/member/id-check";

  try {
    const res = await axios.post<IdData>(url, data);
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.log("API 오류:", error);
    throw error;
  }
};
export default idValidApi;
