"use client";
import { ProductArticle, ProductTab } from "@/styles/homeStyle";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import homeTabApi from "@/api/homeTabApi";
import { Product, User } from "./marketTab";
import searchApi from "@/api/searchApi";
import Pagination from "../pagination";
import Image from "next/image";

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
  page?: number;
  api: string;
  keywords?: string;
  setTotalPosts?: React.Dispatch<React.SetStateAction<number>>;
}

const GroupPurchaseTab: React.FC<Props> = ({ api, keywords }) => {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);

  // 현재 페이지, 총 포스트 개수 관리
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const params = useMemo(
    () => ({
      board_type: "GroupPurchase",
      limit: 10,
      current_page: page,
      sort_by: "",
      order: "DESC",
    }),
    [page]
  );

  // 사용자에게 보일 메시지 설정
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let data;
      switch (api) {
        case "hometab":
          data = await homeTabApi("group", params);
          setTotalPosts(data?.totalCount);
          setData(data);
          data?.totalCount === 0 ? setMessage("등록된 상품이 없습니다") : null;
          break;
        case "search":
          data = await searchApi("group", { ...params, searchItem: keywords });
          setTotalPosts(data?.totalCount);
          setData(data);
          data?.totalCount === 0 ? setMessage("검색 결과가 없습니다.") : null;
          break;
      }
    };
    fetchData();
  }, [api, keywords, params]);

  return (
    <>
      <ProductTab>
        <p className={`${message ? "no_products" : ""}`}>{message}</p>
        {/* 상품 리스트 */}
        <div className="sell_list">
          {data?.groupOrderList &&
            data.groupOrderList.map((item) => {
              return (
                <ProductArticle
                  key={item.groupOrder.post_id}
                  onClick={() => {
                    router.push(`/productDetail/${item.groupOrder.post_id}`);
                  }}
                >
                  <Image
                    width={220}
                    height={220}
                    src={
                      item.fileList && item.fileList.length > 0
                        ? `/api/file/${item.fileList[0]?.up_file}`
                        : ""
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
        {api !== "search" ? (
          <Pagination totalPosts={totalPosts} page={page} setPage={setPage} />
        ) : null}
      </ProductTab>
    </>
  );
};

export default GroupPurchaseTab;
