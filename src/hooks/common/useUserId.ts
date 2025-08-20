import useAuthStore from "@/store/useAuthStore";
import useDecodedToken from "@/hooks/common/useDecodedToken";

export const useUserId = (): string => {
  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  return userId;
};
