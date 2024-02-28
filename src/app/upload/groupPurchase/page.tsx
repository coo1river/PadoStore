"use client";
import groupUploadApi, { GroupReq } from "@/api/groupUploadApi";
import uploadApi from "@/api/uploadApi";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import {
  GroupForm,
  UploadMain,
  AddProduct,
  ProductList,
  ImgWrap,
  AddInputList,
  UserAccount,
  SalePeriod,
  ImgFile,
} from "@/styles/UploadStyle";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface Product {
  product_name: string;
  product_price: string;
  org_quantity: string;
}

interface Input {
  input: string;
}

const GroupPurchase: React.FC = () => {
  // 라우터 사용
  const router = useRouter();

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  // file_id 저장
  const fileId = useRef<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  // 게시물 상태(진행 중, 완료) 관리
  const [postStatus, setPostStatus] = useState<string>("InProgress");

  // 상품 리스트 배열로 저장
  const [productList, setProductList] = useState<Product[]>([]);

  const setActiveClass = (status: string) => {
    return postStatus === status ? "active" : "";
  };

  // api에 보낼 정보 담기
  const form = {
    title: useInput(""),
    content: useInput(""),
    post_method: useInput(""),
    start_dt: useInput(""),
    end_dt: useInput(""),
    bank: useInput(""),
    account_name: useInput(""),
    account_number: useInput(""),
  };

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

  const handleAddProduct = () => {
    if (productInfo) {
      const newProduct: Product = {
        product_name: productInfo.product_name.value,
        product_price: productInfo.product_price.value,
        org_quantity: productInfo.org_quantity.value,
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

  const dataReq: GroupReq = {
    board_type: "groupPurchase",
    user_id: token!,
    title: form.title.value,
    content: form.content.value,
    post_status: postStatus,
    file_group_id: fileId.current,
    product: {
      post_method: form.post_method.value,
      start_dt: form.start_dt.value,
      end_dt: form.end_dt.value,
    },
    questionList: addInputList,
    productDetail: productList,
    user: {
      bank: form.bank.value,
      account_name: form.account_name.value,
      account_number: form.account_number.value,
    },
  };

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();

    uploadApi(imgFile)
      .then((res) => {
        fileId.current = res.file_group_id;
        groupUploadApi({ ...dataReq, file_group_id: fileId.current });
      })
      .catch((error) => {
        console.error("업로드 실패", error);
      });
  };

  return (
    <UploadMain>
      <h2>공동구매 폼</h2>
      <GroupForm>
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
        <label htmlFor="product-title">폼 제목</label>
        <div className="btns_wrap">
          <button
            className={`btn_status ${setActiveClass("InProgress")}`}
            onClick={() => setPostStatus("InProgress")}
          >
            진행 중
          </button>
          <button
            className={`btn_status ${setActiveClass("Completed")}`}
            onClick={() => setPostStatus("Completed")}
          >
            완료
          </button>
        </div>
        <input
          id="product-title"
          type="text"
          placeholder="폼 제목을 입력해 주세요"
          {...form.title}
        />
        <label htmlFor="product-type">상품 종류</label>
        <input
          id="product-type"
          type="text"
          placeholder="상품의 종류를 입력해 주세요"
        />

        {/* 판매 기간 */}
        <h3 className="product_title">판매 기간</h3>
        <SalePeriod>
          <label htmlFor="sale-period" />
          <div className="sale_period_wrap">
            <span>• 시작 날짜</span>
            <input type="date" id="start-date" {...form.start_dt} />
            <span>• 종료 날짜</span>
            <input type="date" id="end-date" {...form.end_dt} />
          </div>
        </SalePeriod>

        {/* 계좌 정보 */}
        <h3 className="product_title">판매 계좌 정보</h3>
        <UserAccount>
          <div>
            <label htmlFor="account-name">• 예금주</label>
            <input
              type="text"
              id="account-name"
              placeholder="예금주를 입력해 주세요"
              {...form.account_name}
            />
            <label htmlFor="back-name">• 은행명</label>
            <select
              name="bank-name"
              id="bank-name"
              value={form.bank.value}
              onChange={form.bank.onChange}
            >
              <option value="none">- 은행 선택 -</option>
              <option value="국민은행">국민은행</option>
              <option value="기업은행">기업은행</option>
              <option value="농협은행">농협은행</option>
              <option value="신한은행">신한은행</option>
              <option value="산업은행">산업은행</option>
              <option value="우리은행">우리은행</option>
              <option value="한국씨티은행">한국씨티은행</option>
              <option value="하나은행">하나은행</option>
              <option value="SC제일은행">SC제일은행</option>
              <option value="경남은행">경남은행</option>
              <option value="광주은행">광주은행</option>
              <option value="대구은행">대구은행</option>
              <option value="부산은행">부산은행</option>
              <option value="저축은행">저축은행</option>
              <option value="새마을금고">새마을금고</option>
              <option value="케이뱅크">케이뱅크</option>
              <option value="토스뱅크">토스뱅크</option>
              <option value="교보증권">교보증권</option>
              <option value="대신증권">대신증권</option>
              <option value="미래에셋증권">미래에셋증권</option>
              <option value="유진투자증권">유진투자증권</option>
              <option value="신한투자증권">신한투자증권</option>
              <option value="키움증권">키움증권</option>
              <option value="하나증권">하나증권</option>
              <option value="하나투자증권">하나투자증권</option>
              <option value="KB증권">KB증권</option>
              <option value="NH투자증권">NH투자증권</option>
            </select>
          </div>
          <label htmlFor="account-number">• 계좌 번호</label>
          <input
            type="type"
            id="account-number"
            placeholder="계좌 번호를 입력해 주세요"
            {...form.account_number}
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
          <option value="none">- 배송 방법 선택 -</option>
          <option value="택배">택배 배송</option>
          <option value="등기">등기 배송</option>
          <option value="준등기">준등기 배송</option>
          <option value="우편">우편 배송</option>
          <option value="기타">기타 배송</option>
        </select>

        {/* 상품 등록 블록 */}
        <h3 className="product_title">상품 등록</h3>
        <AddProduct>
          <div className="product_name">
            <label htmlFor="product_add">• 상품명</label>
            <input
              type="text"
              placeholder="상품명을 입력해 주세요"
              {...productInfo.product_name}
            />
          </div>

          <div className="price_and_count">
            <label htmlFor="product-price">• 가격</label>
            <input
              id="product-price"
              type="text"
              placeholder="상품의 가격을 입력해 주세요"
              {...productInfo.product_price}
            />
            <label htmlFor="product-count">• 수량</label>
            <input
              id="product-price"
              type="text"
              placeholder="상품의 수량을 입력해 주세요"
              {...productInfo.org_quantity}
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
                      •<p className="product_name"> {product.product_name}</p>
                    </div>
                    <div>
                      <p className="product_count">{product.org_quantity}개</p>
                      <p className="product_price">
                        {Number(product.product_price).toLocaleString()}원
                      </p>
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
          {...form.content}
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
              <span className="onf_btn" />
            </label>
          </div>

          {/* 추가 질문 리스트 */}
          {addInputState ? (
            <div className="input_list_wrap">
              <ul>
                {addInputList.map((item, index) => (
                  <li className="add_input_el" key={index}>
                    • {item.input}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                id="add_input"
                placeholder="추가 질문을 작성해 주세요"
                {...addInput.input}
              />
              <button className="btn_add_input" onClick={handleAddInput}>
                질문 추가하기
              </button>
            </div>
          ) : null}
        </AddInputList>

        <button className="btn_upload" onClick={handleUpload}>
          폼 업로드 하기
        </button>
      </GroupForm>
    </UploadMain>
  );
};

export default GroupPurchase;
