"use client";
import {
  GroupSubmit,
  ProductContent,
  ProductImg,
  ProductInfo,
  ProductMain,
  ProfileImg,
} from "@/styles/productStyle";
import IconBasicHeart from "@/../public/assets/svgs/basic-heart.svg";
import IconFullHeart from "@/../public/assets/svgs/full-heart.svg";
import AccountFormInfo from "@/components/accountInfo";
import React, { useEffect, useState } from "react";
import postDetailApi, { Res } from "@/api/postDetailApi";
import DetailModal from "@/components/modal/detailModal";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import { useParams, useRouter } from "next/navigation";
import postLikeApi from "@/api/postLikeApi";
import useAuthStore from "@/store/useAuthStore";

const GroupDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState<Res | null>(null);

  // 이미지 파일 상태 관리
  const [imgFile, setImgFile] = useState<string | File | undefined>("");

  const { authState } = useAuthStore();

  // 찜 상태 관리
  const [like, setLike] = useState<boolean | undefined>(false);

  // 프로필 이미지 가져오기, 찜한 상태 가져오기
  useEffect(() => {
    setImgFile(data?.file[0].up_file);
    setLike(data?.favorite);
  }, [data?.file, data?.favorite]);

  // 게시물 정보 가져오기
  useEffect(() => {
    const detail = async () => {
      const res = await postDetailApi(params.id);
      setData(res);
    };
    detail();
  }, []);

  // 게시물 메뉴 모달 상태 관리
  const [menuModal, setMenuModal] = useState<boolean>(false);

  // 게시물 찜하기
  const handlePostLike = async () => {
    if (data) {
      await postLikeApi(data.post_id);
      setLike((prevLike) => !prevLike);
    }
  };

  // 게시물 메뉴 열기 함수
  const handleClickMenu = () => {
    setMenuModal(!menuModal);
  };

  return (
    <ProductMain>
      <h2 className="a11y-hidden">상품 페이지</h2>
      <section className="product_detail">
        <ProductInfo>
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
              <p>
                <strong>• 판매 기간 : </strong>
                {data?.product.start_dt} ~ {data?.product.end_dt}
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
              <button
                className="btn_like"
                onClick={() => {
                  authState ? handlePostLike() : router.push("/login");
                }}
              >
                찜하기
                {like && authState ? (
                  <IconFullHeart width="20" height="20" fill="#3EABFA" />
                ) : (
                  <IconBasicHeart width="20" height="20" fill="#3EABFA" />
                )}
              </button>
              <button className="btn_purchase">구매하기</button>
            </div>
          </div>
        </ProductInfo>
        <ProductContent>
          <p className="product_contents">
            {data?.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <ul className="tag_list">
            {data?.tag.split(" ").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <GroupSubmit>
            {/* 입금자 정보 폼 */}
            <AccountFormInfo data={data} />
          </GroupSubmit>
        </ProductContent>
      </section>
    </ProductMain>
  );
};

export default GroupDetail;
