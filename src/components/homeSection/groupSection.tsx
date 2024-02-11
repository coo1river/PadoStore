import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import groupImg1 from "../../../public/assets/images/group1.jpg";
import { useRouter } from "next/navigation";

const GroupSection: React.FC = () => {
  const router = useRouter();

  return (
    <ProductTab>
      <h3 className="title_tag">공구 진행 중!</h3>

      {/* 상품 리스트 */}
      <div className="sell_list">
        <ProductArticle
          onClick={() => {
            router.push("/groupDetail");
          }}
        >
          <img src={groupImg1.src} alt="" />
          <h4 className="product_title">귀여운 브라운 쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={groupImg1.src} alt="" />
          <h4 className="product_title">귀여운 브라운 쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={groupImg1.src} alt="" />
          <h4 className="product_title">귀여운 브라운 쿠션쿠션</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={groupImg1.src} alt="" />
          <h4 className="product_title">귀여운 브라운</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
        <ProductArticle>
          <img src={groupImg1.src} alt="" />
          <h4 className="product_title">귀여운 브라우니</h4>
          <p className="user_name">닉네임123</p>
        </ProductArticle>
      </div>
    </ProductTab>
  );
};

export default GroupSection;
