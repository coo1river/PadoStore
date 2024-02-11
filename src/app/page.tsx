"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Welcome: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        router.push("/home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <h2>Welcome</h2>
    </>
  );
};

export default Welcome;
