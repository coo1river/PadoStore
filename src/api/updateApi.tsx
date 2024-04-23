import axios from "axios";
import { Res } from "./postDetailApi";
import { GroupReq } from "./groupUploadApi";

interface UpdateRes {
  post_id: string | undefined;
  board_type: string | undefined;
  title: string;
  content: string;
  file_group_id: string | undefined;
  post_status: string;
  product: {
    price: string;
    product_status: string;
    post_method: string;
  };
}

const updateApi = async (
  method: string,
  post_id?: string,
  data?: UpdateRes | GroupReq
): Promise<Res> => {
  const getUrl = `/api/board/update/${post_id}`;
  const putUrl = "/api/board/update";
  try {
    let res;

    if (method === "get") {
      // GET 요청
      res = await axios.get(getUrl, {
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      });
    } else if (method === "put") {
      // PUT 요청
      res = await axios.put(putUrl, data, {
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      });
    } else {
      throw new Error("지원되지 않는 HTTP 메서드입니다.");
    }

    console.log("API 성공", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default updateApi;
