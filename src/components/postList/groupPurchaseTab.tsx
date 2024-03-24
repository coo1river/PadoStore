"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import homeTabApi from "@/api/homeTabApi";
import { Product, User } from "./marketTab";
import Pagination from "../pagination";
import searchApi from "@/api/searchApi";

export interface GroupItem {
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

export interface Data {
  groupOrderList: GroupItem[];
}

interface Props {
  api: string;
  keywords: string;
}

const GroupPurchaseTab: React.FC<Props> = ({ api, keywords }) => {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);

  // 총 포스트 개수 관리
  const [totalPosts, setTotalPosts] = useState<number>(0);

  // 현재 페이지 관리
  const [page, setPage] = useState<number>(1);

  const params = {
    board_type: "GroupPurchase",
    limit: 10,
    current_page: 1,
    sort_by: "",
    order: "ASC",
    searchItem: keywords || null,
  };

  useEffect(() => {
    const fetchData = async () => {
      let data;
      switch (api) {
        case "hometab":
          data = await homeTabApi("group", params);
          setTotalPosts(data?.totalCount);
          setData(data);
        // case "search":
        //   data = await searchApi();
        //   setTotalPosts(data?.totalCount);
        //   setData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductTab>
      {/* 상품 리스트 */}
      <div className="sell_list">
        {data?.groupOrderList &&
          data.groupOrderList.map((item) => {
            return (
              <ProductArticle
                key={item.groupOrder.post_id}
                onClick={() => {
                  router.push(
                    `/productDetail/:status/${item.groupOrder.post_id}`
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
                  <h4 className="product_title">{item.groupOrder.title}</h4>
                  <div className="price_nickname">
                    <p className="period">~{item.product?.end_dt}</p>
                    <p className="user_name">{item.user?.nickname}</p>
                  </div>
                </div>
              </ProductArticle>
            );
          })}
      </div>
      <Pagination totalPosts={totalPosts} page={page} setPage={setPage} />
    </ProductTab>
  );
};

export default GroupPurchaseTab;
