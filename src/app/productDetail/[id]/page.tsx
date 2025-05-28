"use client";
import {
  ProductContent,
  ProductInfo,
  ProductMain,
  ProductImg,
  ProfileImg,
  SoldOutFilter,
} from "@/styles/productStyle";
import IconBasicHeart from "@/../public/assets/svgs/basic-heart.svg";
import IconFullHeart from "@/../public/assets/svgs/full-heart.svg";
import React, { useEffect, useState } from "react";
import postDetailApi, { Res } from "@/api/postDetailApi";
import DetailModal from "@/components/modal/detailModal";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import { useParams, useRouter } from "next/navigation";
import postLikeApi from "@/api/postLikeApi";
import useAuthStore from "@/store/useAuthStore";
import useDecodedToken from "@/hooks/common/useDecodedToken";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState<Res | null>(null);

  // 이미지 파일 상태 관리
  const [imgFile, setImgFile] = useState<string | File | undefined>("");

  const { authState } = useAuthStore();

  // 토큰 가져오기
  const { token } = useAuthStore();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const userId = useDecodedToken(token!);

  // 찜 상태 관리
  const [like, setLike] = useState<boolean | undefined>(false);

  // 프로필 이미지 가져오기, 찜한 상태 가져오기
  useEffect(() => {
    setImgFile(data?.file[0].up_file);
    setLike(data?.favorite);
  }, [data?.file, data?.favorite]);

  useEffect(() => {
    const detail = async () => {
      const res = await postDetailApi(params.id);
      console.log(res);
      setData(res);
    };
    detail();
  }, [params.id]);

  const [menuModal, setMenuModal] = useState<boolean>(false);

  // 게시물 찜하기(본인 게시물인 경우 불가능)
  const handlePostLike = async () => {
    if (authState && data?.user_id === userId) {
      alert("본인 게시물에는 찜하기가 불가능합니다.");
      return;
    }

    if (data) {
      await postLikeApi(data.post_id);
      setLike((prevLike) => !prevLike);
    }
  };

  const handleClickMenu = () => {
    setMenuModal(!menuModal);
  };

  // 채팅으로 라우팅
  const handleClickChat = () => {
    if (userId === data?.user_id) {
      alert("본인과는 채팅이 불가능합니다.");
      return;
    }
    router.push(`/chat/${userId}/${data?.user_id}`);
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
                ? `/api/file/${data?.file[0]?.up_file}`
                : undefined
            }
            alt="상품 이미지"
          />
          <div className="product_intro_button">
            <div className="product_intro">
              <div className="title_update">
                <h3 className="product_title">{data?.title}</h3>
                {data?.user_id === userId ? (
                  <>
                    <button
                      className="btn_update"
                      aria-label="수정"
                      onClick={handleClickMenu}
                    />
                    {menuModal ? (
                      <DetailModal data={data} setMenuModal={handleClickMenu} />
                    ) : null}
                  </>
                ) : null}
              </div>
              <p className="product_price">{data?.product.price}원</p>
              <div className="product_condition_ship">
                <p>
                  <strong>상품 상태 : </strong>
                  {data?.product.product_status}
                </p>
                <p>
                  <strong>배송 방법 : </strong>
                  {data?.product.post_method}
                </p>
              </div>
            </div>
            <div className="profile_wrap">
              {data?.userFile && data?.userFile.up_file ? (
                <ProfileImg
                  className="img_profile"
                  src={
                    data?.userFile && data?.userFile.up_file
                      ? `/api/file/${data?.userFile.up_file}`
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
                aria-label="찜하기"
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
              <button
                className="btn_chat"
                aria-label="채팅"
                onClick={handleClickChat}
              >
                구매 채팅하기
              </button>
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
