"use client";
import { UploadForm, UploadMain } from "@/styles/UploadStyle";

const Product: React.FC = () => {
  return (
    <UploadMain>
      <h2>상품 업로드</h2>
      <article>
        <UploadForm>
          <label className="label_file" htmlFor="file-img" />
          <input
            className="input_file"
            type="file"
            id="file-img"
            accept="image/*"
          />

          <label htmlFor="product-title">이름</label>
          <div className="btn_wrap">
            <button>판매</button>
            <button>교환</button>
            <button>구매</button>
          </div>
          <input
            id="product-title"
            type="text"
            placeholder="상품의 이름을 입력해 주세요"
          />

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

          <button className="btn_upload">상품 업로드 하기</button>
        </UploadForm>
      </article>
    </UploadMain>
  );
};

export default Product;
