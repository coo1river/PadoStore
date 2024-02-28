import axios from "axios";

export interface NumData {
  number: string;
}

const numberValidApi = async (data: NumData) => {
  const url = "/api/phone-check";

  try {
    const res = await axios.post<NumData>(url, data);
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.log("API 오류:", error);
    throw error;
  }
};

export default numberValidApi;
