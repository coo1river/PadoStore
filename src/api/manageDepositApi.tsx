import axios from "axios";

export interface ManageReq {
  post_id: string | string[];
  limit: number;
  current_page: number;
  sort_by: string | null;
  order: string | null;
}

interface OrderProduct {
  order_product_id: number;
  order_id: number;
  purchase_product_name: string;
  purchase_quantity: number;
  purchase_price: number;
  product_detail_id: number;
}

interface OrderAnswer {
  order_answer_id: number;
  order_id: number;
  product_question_id: number;
  answer: string;
}

interface User {
  user_id: string;
  password: string;
  user_name: string;
  nickname: string;
  phone_number: string;
  email: string;
  addr_post: string;
  addr: string;
  addr_detail: string;
  bank: string;
  account_name: string;
  account_number: string;
  file_group_id: number | null;
}

export interface Order {
  order_id: number;
  post_id: number;
  order_status: string;
  total_price: number;
  purchase_user_id: string;
  post_number: string;
  order_dt: string;
  deposit_dt: string | null;
  user: User;
  productList: OrderProduct[];
  answerList: OrderAnswer[];
}

export interface OrderRes {
  orderManageList: Order[];
  totalCount: number;
}

export default async function manageDepositApi(data: ManageReq) {
  const url = "/api/my-page/sale/manage/delivery";

  try {
    const res = await axios.get(url, {
      params: data,
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
}
