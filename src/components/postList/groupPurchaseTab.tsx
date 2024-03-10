"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import productImg1 from "../../../public/assets/images/product1.jpg";
import { useRouter } from "next/navigation";
import { HomeList } from "@/app/home/page";
import { useEffect } from "react";
import homeTabApi from "@/api/homeTabApi";

interface Props {
  productList: HomeList[]; // productList로 변경
}

const GroupPurchaseTab: React.FC = () => {
  const router = useRouter();

  const params = {
    board_type: "GroupPurchase",
    limit: 10,
    current_page: 1,
    sort_by: "",
    order: "ASC",
  };

  useEffect(() => {
    const marketData = async () => {
      const data = await homeTabApi("group", params);
      console.log(data);
    };
    marketData();
  }, []);

  return (
    <ProductTab>
      {/* 상품 리스트 */}
      <div className="sell_list">
        <ProductArticle
          onClick={() => {
            router.push(`/productDetail/:status/:id`);
          }}
        >
          <img src={productImg1.src} alt="" />
          <div className="product_info">
            <h4 className="product_title">귀여운 춘식이 쿠션</h4>
            <div className="price_nickname">
              <p className="period">~ 2024-03-18</p>
              <p className="user_name">닉네임</p>
            </div>
          </div>
        </ProductArticle>
      </div>
    </ProductTab>
  );
};

export default GroupPurchaseTab;
