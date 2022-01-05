import React from "react";
import styled from "styled-components";
import { MdFileDownload, MdFilePresent } from "react-icons/md";
import { useParams } from "react-router-dom";

import { useTodoState } from "../TodoContext";

const Download = styled.a`
  display: inline-block;
  color: gray;
  font-size: 16px;
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
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  /*border-bottom: 1px solid #e9ecef;*/
  color: #343a40;
  .attached {
    margin-top: 10px;
  }
`;

const PreviewImage = styled.div`
  /*padding-top: 28px;*/
  color: #868e96;
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  img {
    display: block;
  }
  .text {
    margin-bottom: 10px;
  }
`;

const Description = styled.div`
  margin-bottom: 20px;
  padding-bottom: 24px;
  height: 220px;
  border-bottom: 1px solid #e9ecef;
  .detailInfo {
    color: #868e96;
    background-color: transparent;
    font-size: 16px;
    font-weight: bold;
  }
  .description {
    font-size: 16px;
    margin-top: 16px;
  }
`;

const Attachment = styled.div`
  margin-top: 10px;
  color: black;
  font-size: 14px;
  font-weight: normal;
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
        <Description>
          <div className="detailInfo">상세 정보</div>
          <div className="description">{todo.description}</div>
        </Description>
        {todo.file && todo.file.type.substring(0, 5) === "image" ? (
          <PreviewImage>
            <div className="text">첨부 이미지</div>
            <img
              alt={todo.file.name}
              src={URL.createObjectURL(todo.file)}
              style={{ margin: "auto", maxWidth: "450px", maxHeight: "200px" }}
            />
          </PreviewImage>
        ) : todo.file ? (
          <PreviewImage>
            <div className="text">첨부 파일</div>
            <Attachment>
              <MdFilePresent />
              {todo.file.name}
            </Attachment>
          </PreviewImage>
        ) : (
          <PreviewImage>
            <div className="text">첨부 파일</div>
            <Attachment
              style={{ color: "black", fontSize: "14px", fontWeight: "normal" }}
            >
              첨부한 파일이 없습니다
            </Attachment>
          </PreviewImage>
        )}
        {todo.file && (
          <div className="attached">
            <Download
              href={URL.createObjectURL(todo.file)}
              download={todo.file.name}
            >
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
