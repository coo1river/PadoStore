"use client";
import { UploadForm, UploadMain } from "@/styles/productUpload";

const GroupPurchase: React.FC = () => {
  return (
    <UploadMain>
      <h2>공동구매 폼</h2>
      <article>
        <UploadForm>
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

          <div className="상품 목록">
            <button>상품 추가</button>
            <ul>
              <li>상품 1</li>
              <li>상품 1</li>
              <li>상품 1</li>
            </ul>
          </div>

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
        </UploadForm>
      </article>
    </UploadMain>
  );
};

export default GroupPurchase;
