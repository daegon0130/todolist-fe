import React from "react";
import styled from "styled-components";
import { MdFileDownload } from "react-icons/md";
import { useParams } from "react-router-dom";

import { useTodoState } from "../TodoContext";

const Download = styled.a`
  display: inline-block;
  color: #dee2e6;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const TodoDetailTitle = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-name {
    color: #20c997;
    font-size: 24px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

const TodoDetailContent = styled.div`
  padding-top: 28px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  color: #343a40;
  .attached {
    margin-top: 14px;
  }
`;

const PreviewImage = styled.div`
  padding-top: 28px;
  font-size: 14px;
  img {
    display: block;
  }
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

function ViewDetail() {
  const todos = useTodoState();
  const { todoId } = useParams();
  const todo = todos.find((todo) => todo.id == todoId);
  console.log(todos);
  console.log(todo);
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <>
      <TodoDetailTitle>
        <h1>{dateString}</h1>
        <div className="day">{dayName}</div>
        <div className="tasks-name">{todo.text}</div>
      </TodoDetailTitle>
      <></>
      <TodoDetailContent>
        <Description>{todo.description}</Description>
        {todo.file && (
          <PreviewImage>
            첨부 이미지
            <img
              alt="sample"
              src={URL.createObjectURL(todo.file)}
              style={{ margin: "auto", maxWidth: "200px", maxHeight: "200px" }}
            />
          </PreviewImage>
        )}
        {todo.file && (
          <div className="attached">
            <Download href={URL.createObjectURL(todo.file)} download>
              <MdFileDownload />
              파일 다운로드
            </Download>
          </div>
        )}
      </TodoDetailContent>
    </>
  );
}

export default ViewDetail;
