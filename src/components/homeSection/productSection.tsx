"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import { useRouter, useSearchParams } from "next/navigation";
import { HomeData, HomeList } from "@/app/home/page";
import { MarketItem, Product, User } from "../postList/marketTab";

export interface GroupOrderList {
  fileList: {
    file_id: number;
    org_file: string;
    up_file: string;
    file_group_id: string;
  }[];
  groupOrder: {
    board_type: string;
    content: string;
    file_group_id: string | null;
    insert_dt: string;
    post_id: number;
    post_status: string;
    title: string;
    update_dt: string | null;
    user_id: string;
    view_count: number;
  };
  product: Product;
  user: User;
}

interface ProductSectionProps {
  marketList: MarketItem[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ marketList }) => {
  const router = useRouter();
  const params = useSearchParams();

  console.log(marketList);

  return (
    <ProductTab>
      <h3 className="title_tag">현재 판매 중!</h3>

      {/* 상품 리스트 */}
      <div className="sell_list">
        {marketList &&
          marketList.map((item) => {
            return (
              <ProductArticle
                key={item.market.post_id}
                onClick={() => {
                  router.push(`/productDetail/:status/${item.market.post_id}`);
                }}
              >
                <img
                  src={
                    item.fileList && item.fileList.length > 0
                      ? `/upload/${item.fileList[0]?.up_file}`
                      : undefined
                  }
                  alt="상품 이미지"
                />
                <div className="product_info">
                  <h4 className="product_title">{item.market.title}</h4>
                  <div className="price_nickname">
                    <p className="product_price">{item.product?.price}원</p>
                    <p className="user_name">{item.user?.nickname}</p>
                  </div>
                </div>
              </ProductArticle>
            );
          })}
      </div>
    </ProductTab>
  );
};

export default ProductSection;
