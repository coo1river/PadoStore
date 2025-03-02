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
  favorite: boolean;
  tag: string;
  product: {
    price: string;
    product_id: number;
    post_id: number;
    product_status: string;
    post_method: string;
    post_price: string;
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
  loginUser: {
    account_name: string;
    account_number: string;
    addr: null;
    addr_detail: null;
    addr_post: null;
    bank: string;
    email: string;
    file_group_id: string;
    nickname: string;
    password: null;
    phone_number: string;
    user_id: string;
    user_name: string;
  };
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
  userFile: {
    up_file: string;
  };
  file: {
    file_id: number;
    org_file: string;
    up_file: string;
    file_group_id: string;
  }[];
}

const postDetailApi = async (post_id: string | string[]): Promise<Res> => {
  const url = `/api/board/${post_id}`;
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

export default postDetailApi;
