"use client";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import {
  GroupForm,
  UploadMain,
  AddProduct,
  ProductList,
} from "@/styles/UploadStyle";
import { useState } from "react";

interface Product {
  name: string;
  price: string;
  count: string;
}

const GroupPurchase: React.FC = () => {
  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  const form = {
    board_type: "groupPurchase",
    user_id: token,
    title: useInput(""),
    content: useInput(""),
  };

  // useInput 사용으로 사용 정보 내용 담기
  const productInfo = {
    name: useInput(""),
    price: useInput(""),
    count: useInput(""),
  };

  // 상품 리스트 배열로 저장
  const [productList, setProductList] = useState<Product[]>([]);

  const handleAddProduct = () => {
    if (productInfo.name) {
      const newProduct: Product = {
        name: productInfo.name.value,
        price: productInfo.price.value,
        count: productInfo.count.value,
      };
      setProductList((prevList) => [...prevList, newProduct]);

      // input value 초기화
      productInfo.name.clear();
      productInfo.price.clear();
      productInfo.count.clear();
    }
  };

  return (
    <UploadMain>
      <h2>공동구매 폼</h2>
      <article>
        <GroupForm>
          <label className="label_file" htmlFor="file-img" />
          <input
            className="input_file"
            type="file"
            id="file-img"
            accept="image/*"
          />
          <label htmlFor="product-title">폼 제목</label>
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

          <label htmlFor="delivery-method">배송 방법</label>
          <select name="delivery-method" id="delivery-method">
            <option>택배 배송</option>
            <option>등기 배송</option>
            <option>준등기 배송</option>
            <option>우편 배송</option>
            <option>기타 배송</option>
          </select>

          {/* 상품 등록 블록 */}
          <h3 className="product_title">상품 등록</h3>
          <AddProduct>
            <div className="product_name">
              <label htmlFor="product_add">• 상품명</label>
              <input
                type="text"
                placeholder="상품명을 입력해 주세요"
                {...productInfo.name}
              />
            </div>

            <div className="price_and_count">
              <label htmlFor="product-price">• 가격</label>
              <input
                id="product-price"
                type="text"
                placeholder="상품의 가격을 입력해 주세요"
                {...productInfo.price}
              />
              <label htmlFor="product-count">• 수량</label>
              <input
                id="product-price"
                type="text"
                placeholder="상품의 가격을 입력해 주세요"
                {...productInfo.count}
              />
            </div>
            <button className="btn_product_add" onClick={handleAddProduct}>
              상품 추가
            </button>
          </AddProduct>

          {/* 상품 리스트 */}
          <h3 className="product_title">상품 리스트</h3>
          <ProductList>
            <ul className="product_list">
              {productList.map((product, index) => (
                <li className="product_el" key={index}>
                  <div>
                    •<p className="product_name"> {product.name}</p>
                  </div>
                  <div>
                    <p className="product_count">{product.count}개</p>
                    <p className="product_price">
                      {Number(product.price).toLocaleString()}원
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ProductList>

          <label htmlFor="product-contents">상품 설명</label>
          <textarea
            className="textarea_contents"
            name="product-contents"
            id="product-contents"
            cols={50}
            rows={10}
            {...form.content}
          />

          <button className="btn_upload">폼 업로드 하기</button>
        </GroupForm>
      </article>
    </UploadMain>
  );
};

export default GroupPurchase;
