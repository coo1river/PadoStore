"use client";
import { Res } from "@/api/postDetailApi";
import updateApi from "@/api/updateApi";
import uploadApi from "@/api/uploadApi";
import { DeliveryOptions, ProductStatus } from "@/components/selectOption";
import TagInput from "@/components/tagInput";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import {
  BasicImg,
  ImgFile,
  ImgWrap,
  UploadForm,
  UploadMain,
} from "@/styles/UploadStyle";
import { useParams, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export default function ProductUpdate() {
  const router = useRouter();
  const { id } = useParams<{ id?: string }>();

  // 게시물 타입 관리
  const [boardType, setBoardType] = useState<string | undefined>("");

  const [data, setData] = useState<Res | null>(null);

  // 이미지 파일 상태 관리
  const [imgFile, setImgFile] = useState<string | File | undefined>("");

  // 게시물 수정 데이터 불러 오기
  useEffect(() => {
    const update = async () => {
      const res = await updateApi("get", id);
      setData(res);
    };
    update();
  }, []);

  // board type 불러오기
  useEffect(() => {
    setBoardType(data?.board_type);
  }, [data?.board_type]);

  useEffect(() => {
    setImgFile(data?.file[0].up_file);
  }, [data?.file]);

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  // useInput 사용으로 사용 정보 내용 담기
  const title = useInput("");
  const content = useInput("");
  const productInfo = {
    price: useInput(""),
    product_status: useInput(""),
    post_method: useInput(""),
  };

  const [tagList, setTagList] = useState<string>("");

  // data 값이 업데이트 되면 input value 업데이트
  useEffect(() => {
    title.setValue(data?.title || "");
    content.setValue(data?.content || "");
    productInfo.price.setValue(data?.product.price || "");
    productInfo.product_status.setValue(data?.product.product_status || "");
    productInfo.post_method.setValue(data?.product.post_method || "");
    setTagList(data?.tag || "");
  }, [data]);

  // useRef 사용
  const InputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경 함수
  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImgFile(selectedFile);
    }
  };

  const setActiveClass = (status: string) => {
    return boardType === status ? "active" : "";
  };

  // api에 보낼 수정 데이터 정보 담기
  const req = {
    post_id: id,
    board_type: boardType,
    user_id: token,
    title: title.value,
    content: content.value,
    post_status: "InProgress",
    file_group_id: "",
    tag: tagList,
    product: {
      price: productInfo.price.value,
      product_status: productInfo.product_status.value,
      post_method: productInfo.post_method.value,
    },
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !title.value ||
      !productInfo.price.value ||
      !productInfo.product_status.value ||
      !productInfo.post_method.value ||
      !content.value ||
      !imgFile
    ) {
      alert("필수 항목을 입력해 주세요");
      return;
    }
    // 이미지 파일이 변경된 경우에만 uploadAPi 호출
    if (typeof imgFile !== "string") {
      uploadApi(imgFile)
        .then(async (res) => {
          return await updateApi("put", undefined, {
            ...req,
            file_group_id: res.file_group_id,
          });
        })
        .then((data) => {
          console.log("수정 성공", data);
          router.push("/home");
        })
        .catch((error) => {
          console.error("수정 실패", error);
        });
    } else {
      updateApi("put", undefined, {
        ...req,
        file_group_id: data?.file[0].file_group_id,
      })
        .then((data) => {
          console.log("수정 성공", data);
          router.push("/home");
        })
        .catch((error) => {
          console.error("수정 실패", error);
        });
    }
  };

  return (
    <UploadMain>
      <h2 className="a11y-hidden">상품 업로드</h2>
      <article>
        <UploadForm>
          <ImgWrap>
            {imgFile ? (
              <ImgFile
                src={
                  typeof imgFile === "string"
                    ? `/upload/${imgFile}`
                    : imgFile
                    ? URL.createObjectURL(imgFile)
                    : undefined
                }
                alt="이미지 파일"
              />
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
            value={productInfo.price.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/[^\d]/g, "");
              productInfo.price.onChange({
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

          {/* 상품 태그 */}
          <TagInput tagList={tagList || ""} setTagList={setTagList} />

          <button className="btn_upload" onClick={handleUpdate}>
            상품 업로드 하기
          </button>
        </UploadForm>
      </article>
    </UploadMain>
  );
}
