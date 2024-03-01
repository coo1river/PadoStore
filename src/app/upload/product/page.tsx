"use client";
import productUploadApi from "@/api/productUploadApi";
import { DeliveryOptions, ProductStatus } from "@/components/selectOption";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import { ImgFile, ImgWrap, UploadForm, UploadMain } from "@/styles/UploadStyle";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const Product: React.FC = () => {
  // 라우터 사용
  const router = useRouter();
  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  // useInput 사용으로 사용 정보 내용 담기
  const title = useInput("");
  const content = useInput("");
  const productInfo = {
    product_price: useInput(""),
    product_status: useInput(""),
    post_method: useInput(""),
  };
  const userInfo = {
    bank: useInput(""),
    account_name: useInput(""),
    account_number: useInput(""),
  };

  // 게시물 타입 관리
  const [boardType, setBoardType] = useState<string>("Sell");

  // api에 보낼 정보 담기
  const req = {
    board_type: boardType,
    user_id: token,
    title: title.value,
    content: content.value,
    product: {
      product_status: productInfo.product_status.value,
      post_method: productInfo.post_method.value,
    },
  };

  const setActiveClass = (status: string) => {
    return boardType === status ? "active" : "";
  };

  // 이미지 파일 상태 관리
  const [imgFile, setImgFile] = useState<File | null>(null);

  // useRef 사용
  const InputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경, 업로드 시 api 요청 함수
  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImgFile(selectedFile);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await productUploadApi(req);
      console.log("업로드 성공", data);
      router.push("/home");
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <UploadMain>
      <h2>상품 업로드</h2>
      <article>
        <UploadForm>
          <ImgWrap>
            {imgFile && (
              <ImgFile src={URL.createObjectURL(imgFile)} alt="이미지 파일" />
            )}
            <label className="label_file" htmlFor="file-img" />
            <input
              className="input_file"
              type="file"
              id="file-img"
              accept="image/*"
              onChange={onChangeFile}
              ref={InputRef}
            />
          </ImgWrap>

          <label htmlFor="product-title">상품 이름</label>
          <div className="btn_wrap">
            <button
              className={`btn_status ${setActiveClass("Sell")}`}
              onClick={() => setBoardType("Sell")}
            >
              판매
            </button>
            <button
              className={`btn_status ${setActiveClass("Trade")}`}
              onClick={() => setBoardType("Trade")}
            >
              교환
            </button>
            <button
              className={`btn_status ${setActiveClass("Purchase")}`}
              onClick={() => setBoardType("Purchase")}
            >
              구매
            </button>
          </div>
          <input
            id="product-title"
            type="text"
            placeholder="상품의 이름을 입력해 주세요"
            {...title}
          />

          {/* 상품 가격 */}
          <label htmlFor="product-price">가격</label>
          <input
            id="product-price"
            type="text"
            placeholder="상품의 가격을 입력해 주세요"
            {...productInfo.product_price}
          />

          {/* 상품 상태 */}
          <label htmlFor="product-status">상품 상태</label>
          <select
            name="product-status"
            id="product-status"
            value={productInfo.product_status.value}
            onChange={productInfo.product_status.onChange}
          >
            <ProductStatus />
          </select>

          {/* 배송 방법 */}
          <label htmlFor="delivery-method">배송 방법</label>
          <select
            name="delivery-method"
            id="delivery-method"
            value={productInfo.post_method.value}
            onChange={productInfo.post_method.onChange}
          >
            <DeliveryOptions />
          </select>

          {/* 상품 설명 */}
          <label htmlFor="product-contents">상품 설명</label>
          <textarea
            className="textarea_contents"
            name="product-contents"
            id="product-contents"
            cols={50}
            rows={10}
            {...content}
          />

          <button className="btn_upload" onClick={handleUpload}>
            상품 업로드 하기
          </button>
        </UploadForm>
      </article>
    </UploadMain>
  );
};

export default Product;
