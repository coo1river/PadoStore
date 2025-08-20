"use client";
import { useState } from "react";

export default function useTabStatus(defaultTab: string = "Home") {
  // 탭 관리
  const [tabStatus, setTabStatus] = useState<string>(defaultTab);

  const setActiveClass = (status: string) => {
    return tabStatus === status ? "active" : "";
  };

  return { tabStatus, setTabStatus, setActiveClass };
}
