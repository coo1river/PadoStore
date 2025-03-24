"use client";
import useDecodedToken from "@/hooks/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import { LoginMain } from "@/styles/loginStyle";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Kakao() {
  const router = useRouter();

  const { setToken } = useAuthStore();

  const [token, setLocalToken] = useState<string | null>(null);
  const code =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("code")
      : null;

  // 토큰 디코딩 및 페이지 이동 처리
  useEffect(() => {
    if (token) {
      const decodedUserId = useDecodedToken(token);
      if (decodedUserId) {
        router.push(`/editProfile/${decodedUserId}`);
      }
    }
  }, [token, router]);

  // 카카오 로그인 요청 처리
  useEffect(() => {
    if (code) {
      axios
        .post("/api/sns/kakao", { code: code })
        .then((res) => {
          if (res.status === 200) {
            console.log("카카오 로그인 성공:", res.data);
            const newToken = res.headers.authorization;

            setToken(newToken);
            sessionStorage.setItem("userToken", newToken);

            setLocalToken(newToken);
          } else {
            console.error(
              "카카오 로그인 실패: 상태 코드가 200이 아님",
              res.status
            );
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [code, setToken]);

  return <LoginMain />;
}
