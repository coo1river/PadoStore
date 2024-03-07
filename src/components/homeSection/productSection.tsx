"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import productImg1 from "../../../public/assets/images/product1.jpg";
import { useRouter, useSearchParams } from "next/navigation";

const ProductSection: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  console.log(params);

  return (
    <ProductTab>
      <h3 className="title_tag">현재 판매 중!</h3>

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
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <div className="product_info">
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </div>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <div className="product_info">
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </div>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <div className="product_info">
            <h4 className="product_title">귀여운 춘식이</h4>
            <p className="user_name">닉네임123</p>
          </div>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <div className="product_info">
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </div>
        </ProductArticle>
      </div>
    </ProductTab>
  );
};

export default ProductSection;
