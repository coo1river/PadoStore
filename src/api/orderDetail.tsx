import axios from "axios";

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

interface Answer {
  order_answer_id: number;
  order_id: number;
  answer: string;
}

interface OrderProduct {
  order_product_id: number;
  order_id: number;
  purchase_product_name: string;
  purchase_quantity: number;
  purchase_price: number;
  product_detail_id: number;
}

export interface OrderData {
  order_id: number;
  post_id: number;
  order_status: string;
  purchase_user_id: string;
  post_number: string;
  order_dt: string;
  deposit_dt: string;
  total_price: string;
  user: User;
  answerList: Answer[];
  orderProductList: OrderProduct[];
}

export default async function orderDetailApi(order_id: string | string[]) {
  const url = `/api/order/${order_id}`;

  try {
    const res = await axios.get(url, {
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
