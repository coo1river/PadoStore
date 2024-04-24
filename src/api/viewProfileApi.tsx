import axios from "axios";

export interface ViewProfileRes {
  user: {
    user_id: string;
    password: string;
    user_name: string;
    nickname: string;
    phone_number: string;
    email: string;
    addr_post: string | null;
    addr: string | null;
    addr_detail: string | null;
    bank: string | null;
    account_name: string | null;
    account_number: string | null;
    file_group_id: string;
  };
  userFile: {
    file_id: number;
    org_file: string;
    up_file: string;
    file_group_id: string;
  };
  favoriteCount: number;
  reviewCount: number;
}

const viewProfileApi = async (): Promise<ViewProfileRes> => {
  const url = "/api/my-page/";
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
    });
    console.log("API 성공", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};
export default viewProfileApi;
