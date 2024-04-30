import axios from "axios";

interface User {
  user_id: string;
  addr_post: string;
  addr: string;
  addr_detail: string;
  bank: string;
  account_name: string;
  account_number: string;
}

interface Order {
  post_id: number;
  purchase_user_id: string;
  post_number: string;
}

interface Answer {
  answer: string;
  product_question_id: string;
}

interface OrderProduct {
  purchase_product_name: string;
  purchase_quantity: number;
  purchase_price: number;
  product_detail_id: number;
}

export interface OrderData {
  order_id: number | undefined;
  user: User;
  order: Order;
  answerList: Answer[];
  orderProductList: OrderProduct[];
}

export default async function editOrderApi(data: OrderData) {
  const url = "api/order/update";

  try {
    const res = await axios.put(url, data, {
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
