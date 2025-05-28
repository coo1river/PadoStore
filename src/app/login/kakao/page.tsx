"use client";
import useDecodedToken from "@/hooks/common/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import { LoginMain } from "@/styles/loginStyle";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Kakao() {
  // 라우팅 사용
  const router = useRouter();

  const { setToken } = useAuthStore();

  // 토큰 로컬 상태 관리
  const [token, setLocalToken] = useState<string | null>(null);
  const code =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("code")
      : null;

  // 토큰 디코딩 처리
  const decodedUserId = useDecodedToken(token!); //

  useEffect(() => {
    if (decodedUserId) {
      router.push(`/editProfile/${decodedUserId}`);
    }
  }, [decodedUserId, router]);

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
