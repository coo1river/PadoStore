import axios from "axios";

interface User {
  user_id: string | undefined;
  addr_post: string | undefined;
  addr: string | undefined;
  addr_detail: string | undefined;
  bank: string | undefined;
  account_name: string | undefined;
  account_number: string | undefined;
}

interface Order {
  post_id: number | undefined;
  purchase_user_id: number | undefined;
  post_number: string | undefined;
}

interface Answer {
  answer: string;
  product_question_id: number;
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
  answerList: Answer[] | undefined;
  orderProductList: OrderProduct[] | undefined;
}

export default async function editOrderApi(data: OrderData) {
  const url = "/api/order/update";

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
