"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../pagination";
import homeTabApi from "@/api/homeTabApi";
import searchApi from "@/api/searchApi";
import { GroupItem } from "./groupPurchaseTab";

export interface Product {
  end_dt: string | null;
  post_id: number;
  post_method: string;
  price: string;
  product_id: number;
  product_status: string;
  start_dt: string | null;
}

export interface User {
  account_name: string | null;
  account_number: string | null;
  addr: string | null;
  addr_detail: string | null;
  addr_post: string | null;
  bank: string | null;
  email: string;
  file_group_id: string;
  nickname: string;
  password: string;
  phone_number: string;
  user_id: string;
  user_name: string;
}

export interface MarketItem {
  fileList: {
    file_id: number;
    org_file: string;
    up_file: string;
    file_group_id: string;
  }[];
  market: {
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

// 데이터 전체 타입
export interface Data {
  marketList: MarketItem[];
  groupOrderList: GroupItem[];
}

interface Props {
  page: number;
  api: string;
  keywords?: string;
  setTotalPosts: (total: number) => void;
}

const MarketTab: React.FC<Props> = ({ page, api, keywords, setTotalPosts }) => {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);

  // api 요청에 보낼 데이터 담기
  const params = {
    board_type: "GroupPurchase",
    limit: 10,
    current_page: page,
    sort_by: "post_id",
    order: "ASC",
  };

  // 사용자에게 보일 메시지 설정
  const [message, setMessage] = useState("");

  // api(home tab / search)를 통해 data 가져오기
  useEffect(() => {
    const fetchData = async () => {
      let data;
      switch (api) {
        case "hometab":
          data = await homeTabApi("market", params);
          setTotalPosts(data?.totalCount);
          setData(data);
          data?.marketList === null ? setMessage("게시물이 없습니다") : null;
          break;
        case "search":
          data = await searchApi("market", { ...params, searchItem: keywords });
          setTotalPosts(data?.totalCount);
          setData(data);
          data?.marketList === null
            ? setMessage("검색 결과가 없습니다.")
            : null;
          break;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {message}
      <ProductTab>
        {/* 상품 리스트 */}
        <div className="sell_list">
          {data?.marketList &&
            data.marketList.map((item) => {
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
                    router.push(
                      `/productDetail/:status/${item.market.post_id}`
                    );
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
            })}
        </div>
      </ProductTab>
    </>
  );
};

export default MarketTab;
