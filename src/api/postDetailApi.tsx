import axios from "axios";

export interface Res {
  post_id: number;
  user_id: string;
  board_type: string;
  title: string;
  content: string;
  file_group_id: string;
  view_count: number;
  insert_dt: string;
  update_dt: string;
  post_status: string;
  product: {
    product_id: number;
    post_id: number;
    product_status: string;
    post_method: string;
    start_dt: string;
    end_dt: string;
  };
  productDetail: [
    {
      product_detail_id: number;
      post_id: number;
      product_name: string;
      product_price: string;
      org_quantity: string;
      current_quantity: string;
    }
  ];
  questionList: [
    {
      product_question_id: number;
      post_id: number;
      input: string;
    }
  ];
  user: {
    user_id: string;
    password: string;
    user_name: string;
    nickname: string;
    phone_number: string;
    email: string;
    addr_post: null;
    addr: null;
    addr_detail: null;
    bank: null;
    account_name: null;
    account_number: null;
    file_group_id: string;
  };
  file: {
    file_id: number;
    org_file: string;
    up_file: string;
    file_group_id: string;
  }[];
}

const postDetailApi = async (post_id: number): Promise<Res> => {
  const url = `/api/board/${post_id}`;
  try {
    const res = await axios.get(url);
    console.log("API 성공", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default postDetailApi;
