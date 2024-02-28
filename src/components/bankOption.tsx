import React from "react";

const BankOptions: React.FC = () => {
  const banks: string[] = [
    "국민은행",
    "기업은행",
    "농협은행",
    "신한은행",
    "산업은행",
    "우리은행",
    "한국씨티은행",
    "하나은행",
    "SC제일은행",
    "경남은행",
    "광주은행",
    "대구은행",
    "부산은행",
    "저축은행",
    "새마을금고",
    "케이뱅크",
    "토스뱅크",
    "교보증권",
    "대신증권",
    "미래에셋증권",
    "유진투자증권",
    "신한투자증권",
    "키움증권",
    "하나증권",
    "하나투자증권",
    "KB증권",
    "NH투자증권",
  ];

  return (
    <>
      {banks.map((bank, index) => (
        <option key={index} value={bank}>
          {bank}
        </option>
      ))}
    </>
  );
};

const DeliveryOptions: React.FC = () => {
  const deliveryMethods: string[] = [
    "택배 배송",
    "등기 배송",
    "준등기 배송",
    "우편 배송",
    "기타 배송",
  ];

  return (
    <>
      {deliveryMethods.map((method, index) => (
        <option key={index} value={method}>
          {method}
        </option>
      ))}
    </>
  );
};

export { BankOptions, DeliveryOptions };
