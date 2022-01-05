import React from "react";
import TodoTemplate from "../components/TodoTemplate";
import ViewDetail from "../components/ViewDetail";
import TodoModify from "../components/TodoModify";

function Detail() {
  return (
    <>
      <TodoTemplate>
        <ViewDetail />
        <TodoModify />
      </TodoTemplate>
    </>
  );
}

export default Detail;
