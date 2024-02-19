"use client";
import { GroupForm, UploadMain } from "@/styles/productUploadStyle";

const GroupPurchase: React.FC = () => {
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
            placeholder="상품의 이름을 입력해 주세요"
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

          {/* 상품 추가 블록 */}
          <article className="product_list_article">
            <div className="product_add_wrap">
              <label htmlFor="product_add">상품 등록</label>
              <input type="text" placeholder="상품을 추가해 주세요" />
            </div>
            <button className="btn_product_add">상품 추가</button>
            <ul className="product_list">
              <li>상품 1</li>
              <li>상품 1</li>
              <li>상품 1</li>
            </ul>
          </article>

          <label htmlFor="product-price">가격</label>
          <input
            id="product-price"
            type="text"
            placeholder="상품의 가격을 입력해 주세요"
          />
          <label htmlFor="product-contents"></label>
          <textarea
            className="textarea_contents"
            name="product-contents"
            id="product-contents"
            cols={50}
            rows={10}
          />

          <button className="btn_upload">폼 업로드 하기</button>
        </GroupForm>
      </article>
    </UploadMain>
  );
};

export default GroupPurchase;
