import axios from "axios";

export interface GroupReq {
  board_type: string;
  user_id: string | null;
  title: string;
  content: string;
  post_status: string;
  file_group_id: string | undefined;
  tag: string | null;
  product: {
    post_method: string;
    start_dt: string;
    end_dt: string;
    post_price: string;
  };
  questionList: {
    input: string;
  }[];
  productDetail: {
    product_name: string;
    product_price: string;
    org_quantity: string;
  }[];
  user: {
    bank: string;
    account_name: string;
    account_number: string;
  };
}

const groupUploadApi = async (data: GroupReq) => {
  const url = "/api/board/group-order/post";

  try {
    const res = await axios.post<GroupReq>(url, data, {
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default groupUploadApi;
