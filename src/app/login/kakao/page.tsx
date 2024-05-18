"use client";
import axios from "axios";
import React, { useEffect } from "react";

export default function Kakao() {
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    axios.post("/api/kakao", { code: code }).then((res) => {
      console.log(res.data);
    });
  }, [code]);

  return <div>로딩중</div>;
}
