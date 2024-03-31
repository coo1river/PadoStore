"use client";
import React from "react";
import { GroupItem } from "../postList/groupPurchaseTab";
import { useRouter } from "next/navigation";

interface Props {
  groupList: GroupItem[];
  routePath: string;
}

const MyGroupList: React.FC<Props> = ({ groupList, routePath }) => {
  const router = useRouter();
  console.log("가나다라", routePath);
  return (
    <ul className="myProfile_list">
      {groupList.map((item) => {
        const date = item.groupOrder.insert_dt.split("-").slice(1).join("-");
        return (
          <li
            key={item.groupOrder.post_id}
            onClick={() =>
              router.push(`${routePath}/${item.groupOrder.post_id}`)
            }
          >
            <p className="product_id">{item.groupOrder.post_id}</p>
            <p className="product_title">{item.groupOrder.title}</p>
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

export default MyGroupList;
