import axios from "axios";

export interface GroupReq {
  board_type: string;
  user_id: string;
  title: string;
  content: string;
  product: {
    product_name: string;
    product_price: string;
    product_status: string;
    post_method: string;
    org_quantity: string;
    input: string;
  };
  user: {
    addr_post: string;
    addr: string;
    addr_detail: string;
    bank: string;
    account_name: string;
    account_number: string;
  };
}

const groupUploadApi = async (data: GroupReq) => {
  const url = "/api/board/group-order/post";
  const formData = new FormData();

  // 기본 필드 추가
  const fields = ["board_type", "user_id", "title", "content"];
  fields.forEach((field) => {
    formData.append(field, "String");
  });

  // 중첩된 필드 객체 정의
  const nestedFields = {
    product: [
      "product_name",
      "product_price",
      "product_status",
      "post_method",
      "org_quantity",
      "input",
    ],
    user: [
      "addr_post",
      "addr",
      "addr_detail",
      "bank",
      "account_name",
      "account_number",
    ],
  };

  // 중첩된 필드를 FormData에 추가
  Object.entries(nestedFields).forEach(([parentKey, subFields]) => {
    subFields.forEach((subField) => {
      formData.append(`data[${parentKey}][${subField}]`, "String");
    });
  });

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
