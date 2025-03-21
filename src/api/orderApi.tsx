import axios from "axios";

export interface OrderData {
  order: {
    order_status: string;
    post_id: number | null;
    purchase_user_id: string | null;
    total_price: number;
    deposit_dt: string;
  };
  user: {
    user_id: string | null;
  };

  orderUser: {
    user_name: string;
    addr_post: string;
    addr: string;
    addr_detail: string;
    phone_number: string;
    bank: string;
    account_name: string;
    account_number: string;
  };
  answerList: {
    answer: string;
  }[];
  orderProductList:
    | {
        purchase_product_name: string;
        purchase_quantity: number;
        purchase_price: string;
        product_detail_id: number;
      }[];
}

export default async function orderApi(data: OrderData) {
  const url = "/api/order";

  try {
    const res = await axios.post<OrderData>(url, data, {
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
