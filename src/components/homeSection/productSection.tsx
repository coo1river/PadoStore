"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import productImg1 from "../../../public/assets/images/product1.jpg";
import { useRouter } from "next/navigation";

const ProductSection: React.FC = () => {
  const router = useRouter();

  return (
    <ProductTab>
      <h3 className="title_tag">현재 판매 중!</h3>

      {/* 상품 리스트 */}
      <div className="sell_list">
        <ProductArticle
          onClick={() => {
            router.push("/productDetail");
          }}
        >
          <img src={productImg1.src} alt="" />
          <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <h4 className="product_title">귀여운 춘식이</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={productImg1.src} alt="" />
          <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
      </div>
    </ProductTab>
  );
};

export default ProductSection;
