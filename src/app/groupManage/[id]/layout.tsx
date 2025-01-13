"use client";
import { GroupPurchaseList, ManageMain } from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";
import GroupManage from "./page";

function ManageLayout({ children }: { children: React.ReactNode }) {
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
