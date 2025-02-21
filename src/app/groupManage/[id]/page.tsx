"use client";
import DepositList from "@/components/groupManageList/depositList";
import StockList from "@/components/groupManageList/stockList";

interface GroupManageProps {
  listMenu: "order" | "stock";
}

export default function GroupManage({ listMenu }: GroupManageProps) {
  return <>{listMenu === "order" ? <DepositList /> : <StockList />}</>;
}
