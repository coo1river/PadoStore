"use client";
import { MainBanner } from "@/styles/homeStyle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bannerImg from "@/../../public/assets/images/banner.png";

export default function HomeBanner() {
  const router = useRouter();

  return (
    <MainBanner>
      <Image
        onClick={() => router.push("/groupDetail/InProgress/11")}
        priority
        src={bannerImg}
        alt="배너 이미지"
      />
    </MainBanner>
  );
}
