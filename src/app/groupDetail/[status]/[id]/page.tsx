"use client";
import Image from "next/image";
import productImg1 from "@/../public/assets/images/group1.jpg";
import profileImg from "@/../public/assets/images/profile.png";
import {
  GroupSubmit,
  ProductContent,
  ProductImg,
  ProductInfo,
  ProductMain,
} from "@/styles/productStyle";
import AccountFormInfo from "@/components/accountInfo";

const GroupDetail: React.FC = () => {
  return (
    <ProductMain>
      <h2 className="a11y-hidden">상품 페이지</h2>
      <section className="product_detail">
        <ProductInfo>
          <ProductImg src={productImg1.src} />
          <div className="product_intro_button">
            <div className="product_intro">
              <h3 className="product_title">상품1</h3>
              <p className="product_price">59,000원</p>
              <p>
                <strong>• 판매 기간 : </strong>23/02/09 ~ 23/02/14
              </p>
              <p>
                <strong>• 배송 방법 : </strong>택배
              </p>
            </div>
            <div className="profile_wrap">
              <Image
                className="img_profile"
                src={profileImg}
                alt="프로필 이미지"
              />
              <p className="user_name">목긴알파카123</p>
            </div>
            <div className="btns_wrap">
              <button className="btn_like">찜하기</button>
              <button className="btn_purchase">구매하기</button>
            </div>
          </div>
        </ProductInfo>
        <ProductContent>
          <p className="product_contents">
            너무 귀여운 브라운 쿠션입니다. 귀엽죠 귀엽죠
          </p>
          <GroupSubmit>
            {/* 입금자 정보 폼 */}
            <AccountFormInfo />
          </GroupSubmit>
        </ProductContent>
      </section>
    </ProductMain>
  );
};

export default GroupDetail;
