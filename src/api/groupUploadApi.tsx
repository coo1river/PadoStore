import axios from "axios";

export interface GroupReq {
  board_type: string;
  user_id: string;
  title: string;
  content: string;
  post_status: string;
  file_group_id: number | null;
  product: {
    post_method: string;
    start_dt: string;
    end_dt: string;
  };
  product_question: {
    input: string[];
  };
  product_detail: {
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

  const req = {
    board_type: data.board_type,
    user_id: data.user_id,
    title: data.title,
    content: data.content,
    post_status: data.post_status,
    file_group_id: "String",
    product: {
      post_method: data.product.post_method,
      start_dt: data.product.start_dt,
      end_dt: data.product.end_dt,
    },
    product_detail: [JSON.stringify(data.product_detail)],
    product_question: {
      input: [JSON.stringify(data.product_question.input)],
    },
    user: {
      bank: "String",
      account_name: "String",
      account_number: "String",
    },
  };

  try {
    const res = await axios.post<GroupReq>(url, req);
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default groupUploadApi;
