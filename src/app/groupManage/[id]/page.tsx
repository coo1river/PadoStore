"use client";
import DepositList from "@/components/groupManageList/depositList";
import StockList from "@/components/groupManageList/stockList";

interface GroupManageProps {
  children: React.ReactNode;
  listMenu: string;
}

export default function GroupManage({ listMenu }: GroupManageProps) {
  return <>{listMenu === "order" ? <DepositList /> : <StockList />}</>;
}
