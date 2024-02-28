import axios from "axios";

export interface ProductReq {
  board_type: string;
  user_id: string;
  title: string;
  content: string;
  product: {
    product_status: string;
    post_method: string;
  };
  user: {
    bank: string;
    account_name: string;
    account_number: string;
  };
}

const productUploadApi = async (data: ProductReq) => {
  const url = "/api/board/market/post";

  const req = {
    board_type: data.board_type,
    user_id: data.user_id,
    title: data.title,
    product: {
      product_status: data.product.product_status,
      post_method: data.product.post_method,
    },
    user: {
      bank: data.user.bank,
      account_name: data.user.account_name,
      account_number: data.user.account_number,
    },
  };
};
