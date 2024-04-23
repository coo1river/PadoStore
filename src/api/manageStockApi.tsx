import axios from "axios";
import { ManageReq } from "./manageDepositApi";

interface Product {
  product_detail_id: number;
  post_id: number;
  product_name: string;
  product_price: string;
  org_quantity: string;
  current_quantity: string;
}

export interface ProductData {
  product: Product[];
}

export default async function manageStockApi(data: ManageReq) {
  const url = "/api/my-page/sale/manage/product";

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
