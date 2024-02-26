import axios from "axios";

export interface GroupReq {
  board_type: string;
  user_id: string;
  title: string;
  content: string;
  post_status: string;
  uploadfiles: File | null;
  product: {
    post_method: string;
    start_dt: string;
    end_dt: string;
    input: string[] | null;
  };
  product_detail: {
    product_name: string;
    product_price: string;
    org_quantity: string;
  }[];
  user: {
    bank: string;
    account_name: string;
    account_number: string;
  };
}

const groupUploadApi = async (data: GroupReq) => {
  const url = "/api/board/group-order/post";
  const formData = new FormData();

  // 상품 정보 객체
  const productObj = {
    product_name: data.product_detail[0].product_name,
    product_price: data.product_detail[0].product_price,
    org_quantity: data.product_detail[0].org_quantity,
  };

  formData.append("board_type", data.board_type);
  formData.append("user_id", data.user_id);
  formData.append("title", data.user_id);
  formData.append("content", data.content);
  formData.append("board_status", data.post_status);

  formData.append("uploadfiles", data.uploadfiles || "");
  formData.append("post_method", data.product.post_method);
  formData.append("start_dt", data.product.start_dt);
  formData.append("end_dt", data.product.end_dt);
  formData.append("input", JSON.stringify(data.product.input));

  formData.append("product_detail", JSON.stringify(productObj));

  formData.append("bank", data.user.bank);
  formData.append("account_name", data.user.account_name);
  formData.append("account_number", data.user.account_number);

  try {
    const res = await axios.post<GroupReq>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};

export default groupUploadApi;
