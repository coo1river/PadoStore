import { useMemo } from "react";

function useDecodedToken(token: string) {
  return useMemo(() => {
    try {
      const base64Payload = token.split(".")[1];
      const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
      const decodedJWT = JSON.parse(
        decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
      return decodedJWT.user_id;
    } catch (error) {
      console.error("디코딩 중 오류 발생:", error);
    }
  }, [token]);
}

export default useDecodedToken;
