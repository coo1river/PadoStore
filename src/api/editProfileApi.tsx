import axios from "axios";

export interface EditRes {
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
  };
  userFile: {
    file_group_id: string;
    file_id: number;
    org_file: string | null;
    up_file: string;
  };
}

export interface EditReq {
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
  };
}

export default async function editProfileApi(
  method: string,
  user_id?: string | null,
  data?: EditReq
) {
  const getUrl = `/api/profile/${user_id}`;
  const putUrl = "/api/profile/update";

  try {
    let res;

    if (method === "get") {
      // GET 요청
      res = await axios.get(getUrl);
    } else if (method === "put") {
      // PUT 요청
      res = await axios.put(putUrl, data);
    } else {
      throw new Error("지원되지 않는 HTTP 메서드입니다.");
    }

    console.log("API 성공", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
}
