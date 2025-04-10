"use client";
import productUploadApi from "@/api/productUploadApi";
import uploadApi from "@/api/uploadApi";
import {
  DeliveryOptions,
  ProductStatus,
} from "@/components/common/selectOption";
import TagInput from "@/components/common/tagInput";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import {
  BasicImg,
  ImgFile,
  ImgWrap,
  UploadForm,
  UploadMain,
} from "@/styles/uploadStyle";
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

  // 태그 관리
  const [tagList, setTagList] = useState<string>("");

  // 게시물 타입 관리
  const [boardType, setBoardType] = useState<string>("Sell");

  // api에 보낼 정보 담기
  const req = {
    board_type: boardType,
    user_id: token,
    title: title.value,
    content: content.value,
    post_status: "InProgress",
    file_group_id: "",
    tag: tagList,
    product: {
      price: productInfo.product_price.value,
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

  // 이미지 변경 함수
  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImgFile(selectedFile);
    }
  };

  // 게시물 업로드 함수
  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    // 각 input에 값이 비었을 경우 alert 창 띄우기
    if (
      !title.value ||
      !productInfo.product_price.value ||
      !productInfo.product_status.value ||
      !productInfo.post_method.value ||
      !content.value ||
      !imgFile
    ) {
      alert("필수 항목을 입력해 주세요");
      return;
    }

    uploadApi(imgFile)
      .then(async (res) => {
        console.log(res);
        return await productUploadApi({
          ...req,
          file_group_id: res.file_group_id,
        });
      })
      .then((data) => {
        console.log("업로드 성공", data);
        router.push("/home");
      })
      .catch((error) => {
        console.error("업로드 실패", error);
      });
  };

  return (
    <UploadMain>
      <h2 className="a11y-hidden">상품 업로드</h2>
      <article>
        <UploadForm>
          <ImgWrap>
            {imgFile ? (
              <ImgFile src={URL.createObjectURL(imgFile)} alt="이미지 파일" />
            ) : (
              <BasicImg />
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
            value={title.value}
            onChange={title.onChange}
          />

          {/* 상품 가격 */}
          <label htmlFor="product-price">가격</label>
          <input
            id="product-price"
            type="string"
            placeholder="상품의 가격을 입력해 주세요"
            // 쉼표로 가격 표시
            value={productInfo.product_price.value.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/[^\d]/g, "");
              productInfo.product_price.onChange({
                target: { value: formattedValue },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
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
            value={content.value}
            onChange={content.onChange}
          />

          <TagInput tagList={tagList || ""} setTagList={setTagList} />

          <button className="btn_upload" onClick={handleUpload}>
            상품 업로드 하기
          </button>
        </UploadForm>
      </article>
    </UploadMain>
  );
};

export default Product;
