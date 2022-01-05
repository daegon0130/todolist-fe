import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { MdAdd, MdFileUpload } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../TodoContext";
import PostTodo from "../apis/PostTodo";

const Upload = styled.div`
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const SubmitButton = styled.button`
  float: right;
  cursor: pointer;
  background: #20c997;
  color: white;
  border: none;
  width: 70px;
  height: 20px;
`;

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 20px;
  padding-right: 32px;
  padding-bottom: 52px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  const onToggle = () => setOpen(!open);
  const onInputChange = (e) => setInput(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onLoadFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };
  let bodyFormDat = new FormData();
  bodyFormDat.append("title", input);
  bodyFormDat.append("description", description);
  bodyFormDat.append("file", file);

  const onSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지
    if (!input) {
      alert("할 일을 입력하세요");
      return;
    }
    console.log(file);

    let bodyFormData = new FormData();
    bodyFormData.append("title", input);
    bodyFormData.append("description", description);
    bodyFormData.append("file", file);
    const response = await axios({
      method: "post",
      url: "http://slb-9628190.ncloudslb.com/api/todo",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: bodyFormData,
    });
    console.log(response.data);
    window.location.replace("/");

    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: input,
        description: description,
        file: file,
        done: false,
      },
    });
    setInput("");
    setDescription("");
    setFile("");
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <>
          <InsertFormPositioner>
            <InsertForm onSubmit={onSubmit}>
              <Input
                autoFocus
                placeholder="할 일을 입력하세요"
                onChange={onInputChange}
                value={input}
              />
              <Input
                placeholder="상세 정보를 입력하세요"
                onChange={onDescriptionChange}
                value={description}
              />
              <Upload>
                <MdFileUpload />
                <input type="file" onChange={onLoadFile} />
              </Upload>

              <SubmitButton type="submit">추가</SubmitButton>
            </InsertForm>
          </InsertFormPositioner>
        </>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
