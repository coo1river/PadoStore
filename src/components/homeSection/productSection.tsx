"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import { useRouter } from "next/navigation";
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

  return (
    <ProductTab>
      <h3 className="title_tag">현재 판매 중!</h3>

      {/* 상품 리스트 */}
      <div className="sell_list">
        {marketList && marketList.length > 0 ? (
          marketList.map((item) => {
            const marketBoardType = item.market.board_type;
            const boardType =
              marketBoardType === "Sell"
                ? "판매"
                : marketBoardType === "Purchase"
                ? "구매"
                : marketBoardType === "Trade"
                ? "교환"
                : "";

            return (
              <ProductArticle
                key={item.market.post_id}
                onClick={() => {
                  router.push(`/productDetail/${item.market.post_id}`);
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
                  <h4 className="product_title">
                    <strong className="product_type">[{boardType}]</strong>
                    {item.market.title}
                  </h4>
                  <div className="price_nickname">
                    <p className="product_price">
                      {parseInt(item.product.price).toLocaleString()}원
                    </p>
                    <p className="user_name">{item.user?.nickname}</p>
                  </div>
                </div>
              </ProductArticle>
            );
          })
        ) : (
          <p className="no_products">등록된 상품이 없습니다.</p>
        )}
      </div>
    </ProductTab>
  );
};

export default ProductSection;
