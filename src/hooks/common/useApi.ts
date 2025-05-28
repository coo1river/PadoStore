import axios, { Method } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 10000,
});

interface UseApiParams {
  method: Method;
  url: string;
  data?: any;
  params?: any;
  useAuth?: boolean;
  headers?: Record<string, string>;
}

export default async function useApi<T = any>({
  method,
  url,
  data,
  params,
  useAuth = true, // 토큰 기본 필요 값 O
  headers = {},
}: UseApiParams): Promise<T> {
  try {
    const token = sessionStorage.getItem("userToken");
    const res = await axiosInstance({
      method,
      url,
      data,
      params,
      headers: {
        ...(useAuth && token ? { Authorization: token } : {}),
        ...headers,
      },
    });
    console.log("API 응답:", res.data);
    return res.data;
  } catch (error) {
    console.log("API 에러:", error);
    throw error;
  }
}
