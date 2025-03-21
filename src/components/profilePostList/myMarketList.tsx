"use client";
import React from "react";
import { MarketItem } from "../postList/marketTab";
import { useRouter } from "next/navigation";

interface Props {
  marketList: MarketItem[];
}

const MyMarketList: React.FC<Props> = ({ marketList }) => {
  const router = useRouter();

  if (marketList.length === 0) {
    return (
      <ul>
        <li className="no_post">
          <p>거래 내역이 없습니다.</p>
        </li>
      </ul>
    );
  }

  return (
    <ul>
      {marketList.map((item) => {
        const date = item.market.insert_dt.split("-").slice(1).join("-");
        return (
          <li
            key={item.market.post_id}
            onClick={() => router.push(`/productDetail/${item.market.post_id}`)}
          >
            <p className="product_id">{item.market.post_id}</p>
            <p className="product_title">{item.market.title}</p>
            <div className="nickname_dt_wrap">
              <p className="product_nickname">{item.user.nickname}</p>
              <p className="product_date">{date}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MyMarketList;
