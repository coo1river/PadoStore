"use client";
import useDecodedToken from "@/hooks/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Kakao() {
  const router = useRouter();

  const code =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("code")
      : null;

  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  useEffect(() => {
    if (code) {
      axios
        .post("/api/sns/kakao", { code: code })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            useAuthStore.getState().setToken(res.headers.authorization);
            sessionStorage.setItem("userToken", res.headers.authorization);
            router.push(`/editProfile/${userId}`);
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [code, router, userId]);

  return <p>로딩 중</p>;
}
