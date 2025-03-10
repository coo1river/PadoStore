"use client";
import { GroupPurchaseList, ManageMain } from "@/styles/profileStyle";
import React, { useState } from "react";
import DepositList from "@/components/groupManageList/depositList";
import StockList from "@/components/groupManageList/stockList";

function ManageLayout() {
  // 공구 or 주문 상태 관리
  const [listMenu, setListMenu] = useState<"order" | "stock">("order");

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
          {listMenu === "order" ? <DepositList /> : <StockList />}
        </GroupPurchaseList>
      </section>
    </ManageMain>
  );
}

export default ManageLayout;
