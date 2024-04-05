import React, { useState } from "react";

export default function TradeStatusBtn({
  listState,
  setListState,
}: {
  listState: string;
  setListState: Function;
}) {
  const setActiveClass = (status: string) => {
    return listState === status ? "active" : "";
  };

  return (
    <>
      <button
        type="button"
        className={`btn_tab ${setActiveClass("InProgress")}`}
        onClick={() => setListState("InProgress")}
      >
        거래 중
      </button>
      <button
        type="button"
        className={`btn_tab ${setActiveClass("Completed")}`}
        onClick={() => setListState("Completed")}
      >
        거래 완료
      </button>
    </>
  );
}
