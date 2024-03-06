"use client";
import {
  ProductContent,
  ProductInfo,
  ProductMain,
  ProductImg,
  ProfileImg,
} from "@/styles/productStyle";
import React, { useEffect, useState } from "react";
import postDetailApi, { Res } from "@/api/postDetailApi";
import DetailModal from "@/components/detailModal";

const ProductDetail: React.FC = (props) => {
  // console.log(props);

  const id = 1;

  const [data, setData] = useState<Res | null>(null);

  useEffect(() => {
    const detail = async () => {
      const res = await postDetailApi(id);
      console.log(res);
      setData(res);
    };
    detail();
  }, []);

  const [menuModal, setMenuModal] = useState<boolean>(false);

  const handleClickMenu = () => {
    setMenuModal(!menuModal);
  };

  return (
    <ProductMain>
      <h2 className="a11y-hidden">상품 페이지</h2>
      <section className="product_detail">
        <ProductInfo>
          <ProductImg
            src={`/upload/${data?.file[0].up_file}`}
            alt="상품 이미지"
          />
          <div className="product_intro_button">
            <div className="product_intro">
              <div className="title_update">
                <h3 className="product_title">{data?.title}</h3>
                <button className="btn_update" onClick={handleClickMenu} />
                {menuModal ? <DetailModal /> : null}
              </div>
              <p className="product_price"></p>
              <p>
                <strong>• 상품 상태 : </strong>
                {data?.product.product_status}
              </p>
              <p>
                <strong>• 배송 방법 : </strong>
                {data?.product.post_method}
              </p>
            </div>
            <div className="profile_wrap">
              <ProfileImg
                className="img_profile"
                src={`/upload/${data?.userFile.up_file}`}
                alt="프로필 이미지"
              />
              <p className="user_name">{data?.user.nickname}</p>
            </div>
            <div className="btns_wrap">
              <button className="btn_like">찜하기</button>
              <button className="btn_chat">구매 채팅하기</button>
            </div>
          </div>
        </ProductInfo>
        <ProductContent>
          <p className="product_contents">{data?.content}</p>
        </ProductContent>
      </section>
    </ProductMain>
  );
};

export default ProductDetail;
