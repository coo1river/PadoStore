"use client";
import {
  ArticleList,
  GroupPurchaseList,
  ManageMain,
} from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { ViewProfileRes } from "@/api/viewProfileApi";
import { Data } from "@/components/postList/marketTab";
import GroupManage from "./page";

function ManageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  // api로 data와 list 정보 담기
  const [data, setData] = useState<ViewProfileRes | null>(null);
  const [list, setList] = useState<Data | null>(null);

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);

  const [listMenu, setListMenu] = useState<string>("order");

  useEffect(() => {
    console.log(listMenu);
  }, [listMenu]);

  return (
    <ManageMain>
      <h2>공구 관리</h2>
      {/* 사이드 메뉴 바 */}
      <section className="list_wrap">
        <nav>
          <ul className="nav_menu">
            <p>공구 관리</p>
            <li
              className={listMenu === "order" ? "active" : ""}
              onClick={() => {
                setListMenu("order");
              }}
            >
              주문 관리
            </li>
            <li
              className={listMenu === "stock" ? "active" : ""}
              onClick={() => {
                setListMenu("stock");
              }}
            >
              재고 관리
            </li>
          </ul>
        </nav>

        {/* 주문, 재고 목록 */}
        <GroupPurchaseList>
          <GroupManage listMenu={listMenu}>{children}</GroupManage>
        </GroupPurchaseList>
      </section>
    </ManageMain>
  );
}

export default ManageLayout;
