import axios from "axios";

interface User {
  user_id?: string;
  addr_post?: string;
  addr?: string;
  addr_detail?: string;
  bank?: string;
  account_name?: string;
  account_number?: string;
}

interface Order {
  order_id?: number;
  post_id?: number;
  purchase_user_id?: number;
  post_number?: string;
  order_status?: string;
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
  user?: User;
  order: Order;
  answerList?: Answer[] | undefined;
  orderProductList?: OrderProduct[] | undefined;
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
