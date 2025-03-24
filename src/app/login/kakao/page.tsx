"use client";
import useDecodedToken from "@/hooks/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import { LoginMain } from "@/styles/loginStyle";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Kakao() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const code =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("code")
      : null;

  useEffect(() => {
    if (code) {
      axios
        .post("/api/sns/kakao", { code: code })
        .then((res) => {
          // HTTP 상태 코드가 200인 경우에만 처리
          if (res.status === 200) {
            console.log("카카오 로그인 성공:", res.data);

            // 새 토큰 저장
            const newToken = res.headers.authorization;
            setToken(newToken);
            sessionStorage.setItem("userToken", newToken);

            // 토큰 디코딩
            const decodedUserId = useDecodedToken(newToken);

            // 사용자 정보로 라우팅
            if (decodedUserId) {
              router.push(`/editProfile/${decodedUserId}`);
            }
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
  }, [code, router, setToken]);

  return <LoginMain />;
}
