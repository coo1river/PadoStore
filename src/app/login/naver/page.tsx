"use client";
import useDecodedToken from "@/hooks/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Naver() {
  const router = useRouter();

  const code =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("code")
      : null;

  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  useEffect(() => {
    const state = process.env.NEXT_PUBLIC_NAVER_STATE;
    if (code) {
      axios
        .post("/api/sns/naver", { code: code, state: state })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            useAuthStore.getState().setToken(res.headers.authorization);
            sessionStorage.setItem("userToken", res.headers.authorization);
            router.push(`/editProfile/${userId}`);
          }
        })
        .catch((error) => {
          console.error("네이버 로그인 실패:", error);
        });
    }
  }, [code, router]);

  return <div>로딩중</div>;
}
