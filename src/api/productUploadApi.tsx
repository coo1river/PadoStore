import axios from "axios";

export interface ProductReq {
  board_type: string;
  user_id: string | null;
  title: string;
  content: string;
  post_status: string;
  file_group_id: string | "";
  product: {
    price: string;
    product_status: string;
    post_method: string;
  };
}

const productUploadApi = async (data: ProductReq) => {
  const url = "/api/board/market/post";

  try {
    const res = await axios.post<ProductReq>(url, data);
    console.log("API 응답:", res.data);
    console.log(res.status);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default productUploadApi;
