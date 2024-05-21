"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Kakao() {
  const router = useRouter();

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      axios
        .post("/api/kakao", { code: code })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            router.push("/home");
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [code, router]);

  return <div>로딩중</div>;
}
