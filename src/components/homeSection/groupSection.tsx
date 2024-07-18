import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import { useRouter } from "next/navigation";
import { GroupOrderList } from "./productSection";

export interface GroupSectionProps {
  groupOrderList: GroupOrderList[];
}

const GroupSection: React.FC<GroupSectionProps> = ({ groupOrderList }) => {
  const router = useRouter();

  return (
    <ProductTab>
      <h3 className="title_tag">공구 진행 중!</h3>

      {/* 상품 리스트 */}
      {groupOrderList && groupOrderList.length > 0 ? (
        groupOrderList.map((item) => {
          return (
            <div className="sell_list">
              <ProductArticle
                key={item.groupOrder.post_id}
                onClick={() => {
                  router.push(`/groupDetail/${item.groupOrder.post_id}`);
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
                  <h4 className="product_title">{item.groupOrder.title}</h4>
                  <div className="price_nickname">
                    <p className="period">~{item.product?.end_dt}</p>
                    <p className="user_name">{item.user?.nickname}</p>
                  </div>
                </div>
              </ProductArticle>
            </div>
          );
        })
      ) : (
        <p className="no_products">등록된 상품이 없습니다.</p>
      )}
    </ProductTab>
  );
};

export default GroupSection;
