"use client";
import orderDetailApi, { OrderData } from "@/api/orderDetail";
import { ProfileMain } from "@/styles/profileStyle";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const GroupManage: React.FC = () => {
  const params = useParams();

  const [data, setData] = useState<OrderData | null>(null);

  useEffect(() => {
    const detail = async () => {
      const res = await orderDetailApi(params.id);
      console.log(res);
      setData(res);
    };
    detail();
  }, []);

  return (
    <ProfileMain>
      <h2>공구 상세</h2>
    </ProfileMain>
  );
};

export default GroupManage;
