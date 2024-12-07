"use client";
import React from "react";
import { GroupItem } from "../postList/groupPurchaseTab";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useDecodedToken from "@/hooks/useDecodedToken";

interface Props {
  groupList: GroupOrder[] | GroupItem[];
  routePath: string;
}

interface GroupOrder {
  post: Post;
  order: Order;
  user: User;
}

interface Post {
  post_id: number;
  user_id: string;
  board_type: string;
  title: string;
  content: string;
  tag: string;
  file_group_id: null | string;
  view_count: number;
  insert_dt: string;
  update_dt: null | string;
  post_status: string;
}

interface Order {
  order_id: number;
  post_id: number;
  purchase_user_id: string;
  post_number: string;
  order_dt: string;
}

interface User {
  user_id: string;
  password: string;
  user_name: string;
  nickname: string;
  phone_number: string;
  email: string;
  addr_post: string;
  addr: null | string;
  addr_detail: null | string;
  bank: null | string;
  account_name: null | string;
  account_number: null | string;
  file_group_id: null | string;
}

const MyGroupList: React.FC<Props> = ({ groupList, routePath }) => {
  const router = useRouter();

  // zustand에서 token 가져오기
  const { token } = useAuthStore();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const userId = useDecodedToken(token!);

  if (groupList.length === 0) {
    return <p>작성한 글이 없습니다.</p>;
  }

  return (
    <ul className="myProfile_list">
      {groupList.map((item) => {
        // GroupOrder와 GroupItem 구분하기
        const isGroupOrder = "post" in item;

        // 공통적으로 사용할 수 있는 변수 정의
        let postId: number, title, nickname, insertDt;
        if (isGroupOrder) {
          postId = item.post.post_id;
          title = item.post.title;
          nickname = item.user.nickname;
          insertDt = item.post.insert_dt;
        } else {
          postId = item.groupOrder.post_id;
          title = item.groupOrder.title;
          nickname = item.user.nickname;
          insertDt = item.groupOrder.insert_dt;
        }

        const date = insertDt.split("-").slice(1).join("-");

        return (
          <li
            key={postId}
            onClick={() => {
              const routeId = isGroupOrder ? item.order.order_id : postId;
              routePath === "groupManage"
                ? router.push(`/${routePath}/${routeId}`)
                : router.push(`/profile/${userId}/${routePath}/${routeId}`);
            }}
          >
            <p className="product_id">{postId}</p>
            <p className="product_title">{title}</p>
            <div className="nickname_dt_wrap">
              <p className="product_nickname">{nickname}</p>
              <p className="product_date">{date}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MyGroupList;
