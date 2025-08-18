import axios from "axios";
import { useState, useCallback } from "react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 10000,
});

interface UseApiParams {
  method: string;
  url: string;
  data?: any;
  params?: any;
  useAuth?: boolean;
  headers?: Record<string, string>;
}

export default function useApi<T = any>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchApi = useCallback(
    async ({
      method,
      url,
      data,
      params,
      useAuth = true,
      headers = {},
    }: UseApiParams): Promise<T> => {
      setLoading(true);
      setError(null);
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
        setLoading(false);
        console.log("API 응답:", res.data);
        return res.data;
      } catch (err) {
        setLoading(false);
        setError(err);
        console.error("API 에러:", err);
        throw err;
      }
    },
    []
  );

  return { fetchApi, loading, error };
}
