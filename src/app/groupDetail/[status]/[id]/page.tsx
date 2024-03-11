"use client";
import productImg1 from "@/../public/assets/images/group1.jpg";
import {
  GroupSubmit,
  ProductContent,
  ProductImg,
  ProductInfo,
  ProductMain,
  ProfileImg,
} from "@/styles/productStyle";
import AccountFormInfo from "@/components/accountInfo";
import { useEffect, useState } from "react";
import postDetailApi, { Res } from "@/api/postDetailApi";
import DetailModal from "@/components/detailModal";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";

const GroupDetail: React.FC = () => {
  const id = 12;

  const [data, setData] = useState<Res | null>(null);

  // 이미지 파일 상태 관리
  const [imgFile, setImgFile] = useState<string | File | undefined>("");

  useEffect(() => {
    setImgFile(data?.file[0].up_file);
  }, [data?.file]);

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
                {menuModal ? <DetailModal data={data?.file_group_id} /> : null}
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
              <button className="btn_like">찜하기</button>
              <button className="btn_purchase">구매하기</button>
            </div>
          </div>
        </ProductInfo>
        <ProductContent>
          <p className="product_contents">{data?.content}</p>
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
