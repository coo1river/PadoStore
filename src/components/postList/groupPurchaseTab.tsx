"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import productImg1 from "../../../public/assets/images/product1.jpg";
import { useRouter } from "next/navigation";
import { HomeList } from "@/app/home/page";

interface Props {
  productList: HomeList[]; // productList로 변경
}

const GroupPurchaseTab: React.FC = () => {
  const router = useRouter();

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
              <p className="product_price">1000원</p>
              <p className="user_name">닉네임</p>
            </div>
          </div>
        </ProductArticle>
      </div>
    </ProductTab>
  );
};

export default GroupPurchaseTab;
