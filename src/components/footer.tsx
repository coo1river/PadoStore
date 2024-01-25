"use client";
import { FooterCtn } from "@/styles/footer";
import React from "react";

const Footer: React.FC = () => {
  return (
    <FooterCtn>
      <div>
        <p>이용약관</p>
        <span>&nbsp;|&nbsp;</span>
        <p>운영정책</p>
        <span>&nbsp;|&nbsp;</span>
        <p>공지사항</p>
        <span>&nbsp;|&nbsp;</span>
        <p>고객센터</p>
      </div>

      <p>주식회사 COOLRIVER | republic of korea</p>
    </FooterCtn>
  );
};

export default Footer;
