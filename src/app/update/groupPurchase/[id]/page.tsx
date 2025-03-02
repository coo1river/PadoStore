"use client";
import { GroupReq } from "@/api/groupUploadApi";
import { Res } from "@/api/postDetailApi";
import updateApi from "@/api/updateApi";
import uploadApi from "@/api/uploadApi";
import { BankOptions, DeliveryOptions } from "@/components/selectOption";
import TagInput from "@/components/tagInput";
import useInput from "@/hooks/useInput";
import {
  GroupForm,
  UploadMain,
  AddProduct,
  ProductList,
  ImgWrap,
  AddInputList,
  UserAccount,
  ImgFile,
  BasicImg,
} from "@/styles/uploadStyle";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

interface Product {
  product_name: string;
  product_price: string;
  org_quantity: string;
}

interface Input {
  input: string;
}

const GroupPurchaseUpdate: React.FC = () => {
  // 라우터 사용
  const router = useRouter();
  const { id } = useParams<{ id?: string }>();

  // 수정할 데이터 저장하기
  const [data, setData] = useState<Res | null>(null);

  const [imgFile, setImgFile] = useState<string | File | undefined>("");

  // 게시물 상태(진행 중, 완료) 관리
  const [postStatus, setPostStatus] = useState<string>("InProgress");

  // 상품 리스트 배열로 저장
  const [productList, setProductList] = useState<Product[]>([]);

  // 클릭 시 해당 상품 삭제
  const handleRemoveProduct = (index: number) => {
    setProductList((prevList) => {
      const newList = [
        ...prevList.slice(0, index),
        ...prevList.slice(index + 1),
      ];
      return newList;
    });
  };

  // 게시물 수정 데이터 불러 오기
  useEffect(() => {
    const update = async () => {
      const res = await updateApi("get", id);
      console.log(res);
      setData(res);
    };
    update();
  }, [id]);

  useEffect(() => {
    setImgFile(data?.file[0].up_file);
  }, [data?.file]);

  // api에 보낼 정보 담기
  const form = {
    title: useInput(""),
    content: useInput(""),
    post_method: useInput(""),
    post_price: useInput(""),
    start_dt: useInput(""),
    end_dt: useInput(""),
    bank: useInput(""),
    account_name: useInput(""),
    account_number: useInput(""),
  };

  // 태그 관리
  const [tagList, setTagList] = useState<string>("");

  // useRef 사용
  const InputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경, 업로드 시 api 요청 함수
  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImgFile(selectedFile);
    }
  };

  // useInput 사용으로 사용 정보 내용 담기
  const productInfo = {
    product_name: useInput(""),
    product_price: useInput(""),
    org_quantity: useInput(""),
  };

  const addInput = {
    input: useInput(""),
  };

  // 오늘 날짜 가져오기
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const today = date.toISOString().split("T")[0];

  const handleAddProduct = () => {
    if (productInfo) {
      const productName = productInfo.product_name.value;
      const productPrice = productInfo.product_price.value;
      const orgQuantity = productInfo.org_quantity.value;

      // 모든 필드가 공백이 아닐 때만 실행
      if (productName && productPrice && orgQuantity) {
        const newProduct: Product = {
          product_name: productName,
          product_price: productPrice,
          org_quantity: orgQuantity,
        };

        setProductList((prevList) => [...prevList, newProduct]);
      }

      // input value 초기화
      productInfo.product_name.onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      productInfo.product_price.onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      productInfo.org_quantity.onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // 추가 질문 유무 상태
  const [addInputState, setAddInputState] = useState<boolean>(false);

  // 추가 질문 리스트 배열로 저장
  const [addInputList, setAddInputList] = useState<Input[]>([]);

  // 추가 질문 등록 함수
  const handleAddInput = () => {
    if (addInput) {
      const newInput: Input = {
        input: addInput.input.value,
      };
      setAddInputList((prevList) => [...prevList, newInput]);
    }

    addInput.input.onChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleRemoveInput = (index: number) => {
    setAddInputList((prevList) => {
      const newList = [
        ...prevList.slice(0, index),
        ...prevList.slice(index + 1),
      ];
      return newList;
    });
  };

  const dataReq: GroupReq = {
    board_type: "GroupPurchase",
    title: form.title.value,
    content: form.content.value,
    post_status: postStatus,
    file_group_id: "",
    tag: tagList,
    product: {
      post_method: form.post_method.value,
      start_dt: form.start_dt.value,
      end_dt: form.end_dt.value,
      post_price: form.post_price.value,
    },
    questionList: addInputList,
    productDetail: productList,
    user: {
      bank: form.bank.value,
      account_name: form.account_name.value,
      account_number: form.account_number.value,
    },
  };

  // useEffect로 최초 렌더링 시 각 input value에 data 할당
  useEffect(() => {
    form.title.setValue(data?.title || "");
    form.content.setValue(data?.content || "");
    form.post_method.setValue(data?.product.post_method || "");
    form.post_price.setValue(data?.product.post_price || "");
    form.start_dt.setValue(data?.product.start_dt || "");
    form.end_dt.setValue(data?.product.end_dt || "");
    form.account_name.setValue(data?.user.account_name || "");
    form.bank.setValue(data?.user.bank || "");
    form.account_number.setValue(data?.user.account_number || "");
    setProductList(data?.productDetail || []);
    if (data?.questionList) {
      setAddInputState(true);
      setAddInputList(data?.questionList || []);
    }
    setTagList(data?.tag || "");
  }, [data]);

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();

    // 각 input에 값이 비었을 경우 alert 창 띄우기
    if (
      !form.title.value ||
      !form.content.value ||
      !form.post_method.value ||
      !form.start_dt.value ||
      !form.end_dt.value ||
      !form.bank.value ||
      !form.account_name.value ||
      !form.account_number.value ||
      !imgFile ||
      productList.length === 0
    ) {
      alert("필수 항목을 입력해 주세요");
      return;
    }

    // 이미지 파일이 변경된 경우에만 uploadAPi 호출
    if (typeof imgFile !== "string") {
      uploadApi(imgFile)
        .then(async (res) => {
          return await updateApi("put", undefined, {
            ...dataReq,
            post_id: id,
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
        ...dataReq,
        post_id: id,
        file_group_id: data?.file[0].file_group_id,
      })
        .then((data) => {
          console.log("수정 성공", data);
          router.back();
        })
        .catch((error) => {
          console.error("수정 실패", error);
        });
    }
  };

  return (
    <UploadMain>
      <h2 className="a11y-hidden">공동구매 폼</h2>
      <GroupForm>
        <ImgWrap>
          {imgFile ? (
            <ImgFile
              src={
                typeof imgFile === "string"
                  ? `/api/file/${imgFile}`
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
        <label htmlFor="product-title">폼 제목</label>
        <input
          id="product-title"
          type="text"
          placeholder="폼 제목을 입력해 주세요"
          value={form.title.value}
          onChange={form.title.onChange}
        />

        {/* 판매 기간 */}
        <h3 className="product_title">판매 기간</h3>
        <article>
          <label htmlFor="sale-period" />
          <div className="sale_period_wrap">
            <span>시작 날짜</span>
            <input
              type="date"
              id="start-date"
              min={today}
              value={form.start_dt.value}
              onChange={form.start_dt.onChange}
            />
            <span>종료 날짜</span>
            <input
              type="date"
              id="end-date"
              value={form.end_dt.value}
              onChange={form.end_dt.onChange}
            />
          </div>
        </article>

        {/* 계좌 정보 */}
        <h3 className="product_title">판매 계좌 정보</h3>
        <UserAccount>
          <div>
            <label htmlFor="account-name">예금주</label>
            <input
              type="text"
              id="account-name"
              placeholder="예금주를 입력해 주세요"
              value={form.account_name.value}
              onChange={form.account_name.onChange}
            />
            <label htmlFor="back-name">은행명</label>
            <select
              name="bank-name"
              id="bank-name"
              value={form.bank.value}
              onChange={form.bank.onChange}
            >
              <BankOptions />
            </select>
          </div>
          <label htmlFor="account-number">계좌 번호</label>
          <input
            type="number"
            id="account-number"
            placeholder="계좌 번호를 입력해 주세요"
            value={form.account_number.value}
            onChange={form.account_number.onChange}
          />
        </UserAccount>

        {/* 배송 방법 */}
        <label htmlFor="delivery-method">배송 방법</label>
        <select
          name="delivery-method"
          id="delivery-method"
          value={form.post_method.value}
          onChange={form.post_method.onChange}
        >
          <DeliveryOptions />
        </select>

        {/* 배송비 */}
        <label htmlFor="delivery_price">배송비</label>
        <input
          id="delivery-price"
          type="text"
          placeholder="배송비를 입력해 주세요"
          value={form.post_price.value
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const formattedValue = e.target.value.replace(/[^\d]/g, "");
            form.post_price.onChange({
              target: { value: formattedValue },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        />

        {/* 상품 등록 블록 */}
        <h3 className="product_title">상품 등록</h3>
        <AddProduct>
          <div className="product_name">
            <label htmlFor="product_add">상품명</label>
            <input
              type="text"
              placeholder="상품명을 입력해 주세요"
              value={productInfo.product_name.value}
              onChange={productInfo.product_name.onChange}
            />
          </div>

          <div className="price_and_count">
            <label htmlFor="product-price">가격</label>
            <input
              id="product-price"
              type="text"
              placeholder="상품의 가격을 입력해 주세요"
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
            <label htmlFor="product-count">수량</label>
            <input
              id="product-price"
              type="number"
              placeholder="상품의 수량을 입력해 주세요"
              value={productInfo.org_quantity.value}
              onChange={productInfo.org_quantity.onChange}
            />
          </div>
          <button className="btn_product_add" onClick={handleAddProduct}>
            상품 추가
          </button>
        </AddProduct>

        {/* 상품 리스트 */}
        {productList.length > 0 && (
          <>
            <h3 className="product_title">상품 리스트</h3>
            <ProductList>
              <ul className="product_list">
                {productList.map((product, index) => (
                  <li className="product_el" key={index}>
                    <div>
                      <p className="product_name"> {product.product_name}</p>
                    </div>
                    <div className="count_price_wrap">
                      <p className="product_count">{product.org_quantity}개</p>
                      <div>
                        <p className="product_price">
                          {Number(product.product_price).toLocaleString()}원
                        </p>
                        <button
                          className="btn_del"
                          onClick={() => handleRemoveProduct(index)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ProductList>
          </>
        )}

        {/* 상품 설명 */}
        <label htmlFor="product-contents">상품 설명</label>
        <textarea
          className="textarea_contents"
          name="product-contents"
          id="product-contents"
          placeholder="상품 설명을 입력해 주세요"
          cols={50}
          rows={10}
          value={form.content.value}
          onChange={form.content.onChange}
        />

        {/* 추가 질문 */}
        <h3 className="product_title">추가 질문</h3>
        <AddInputList>
          <label htmlFor="add_input" />
          <div className="add_switch_wrap">
            <p>추가 질문 받기</p>
            {/* 추가 질문 스위치 */}
            <input
              type="checkbox"
              id="input_switch"
              checked={addInputState}
              onChange={() => {
                setAddInputState((prevState) => !prevState);
              }}
            />
            <label htmlFor="input_switch" className="switch_label">
              <span className="btn_onf" />
            </label>
          </div>

          {/* 추가 질문 리스트 */}
          {addInputState ? (
            <div className="input_list_wrap">
              <ul>
                {addInputList.map((item, index) => (
                  <li className="add_input_el" key={index}>
                    <div className="input_wrap">
                      <p>{item.input}</p>
                      <button
                        className="btn_del"
                        onClick={() => handleRemoveInput(index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                id="add_input"
                placeholder="추가 질문을 작성해 주세요"
                value={addInput.input.value}
                onChange={addInput.input.onChange}
              />
              <button className="btn_add_input" onClick={handleAddInput}>
                질문 추가하기
              </button>
            </div>
          ) : null}
        </AddInputList>

        {/* 상품 태그 */}
        <TagInput tagList={tagList || ""} setTagList={setTagList} />

        <button className="btn_upload" onClick={handleUpload}>
          폼 업로드 하기
        </button>
      </GroupForm>
    </UploadMain>
  );
};

export default GroupPurchaseUpdate;
