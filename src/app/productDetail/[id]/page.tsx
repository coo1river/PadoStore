"use client";
import {
  ProductContent,
  ProductInfo,
  ProductMain,
  ProductImg,
  ProfileImg,
  SoldOutFilter,
} from "@/styles/productStyle";
import React, { useEffect, useState } from "react";
import postDetailApi, { Res } from "@/api/postDetailApi";
import DetailModal from "@/components/modal/detailModal";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import { useParams } from "next/navigation";

const ProductDetail: React.FC = () => {
  const params = useParams();

  const [data, setData] = useState<Res | null>(null);

  // 이미지 파일 상태 관리
  const [imgFile, setImgFile] = useState<string | File | undefined>("");

  useEffect(() => {
    setImgFile(data?.file[0].up_file);
  }, [data?.file]);

  useEffect(() => {
    const detail = async () => {
      const res = await postDetailApi(params.id);
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
          {data?.post_status === "Completed" ? <SoldOutFilter /> : null}
          <ProductImg
            src={
              data?.file && data?.file[0]?.up_file
                ? `/upload/${data?.file[0]?.up_file}`
                : undefined
            }
            alt="상품 이미지"
          />
          <div className="product_intro_button">
            <div className="product_intro">
              <div className="title_update">
                <h3 className="product_title">{data?.title}</h3>
                <button className="btn_update" onClick={handleClickMenu} />
                {menuModal ? (
                  <DetailModal data={data} setMenuModal={handleClickMenu} />
                ) : null}
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
              {data?.userFile && data?.userFile.up_file ? (
                <ProfileImg
                  className="img_profile"
                  src={
                    data?.userFile && data?.userFile.up_file
                      ? `/upload/${data?.userFile.up_file}`
                      : undefined
                  }
                  alt="프로필 이미지"
                />
              ) : (
                <ProfileImg src={ImgProfileBasic.src} />
              )}

              <p className="user_name">{data?.user.nickname}</p>
            </div>
            <div className="btns_wrap">
              <button className="btn_like">찜하기</button>
              <button className="btn_chat">구매 채팅하기</button>
            </div>
          </div>
        </ProductInfo>
        <ProductContent>
          <p className="product_contents">
            {data?.content.split("\n").map((line, index) => {
              return (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              );
            })}
          </p>
          <ul className="tag_list">
            {data?.tag.split(" ").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </ProductContent>
      </section>
    </ProductMain>
  );
};

export default ProductDetail;
