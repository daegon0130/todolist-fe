import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";
import GetTodoList from "../apis/GetTodoList";
import axios from "axios";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useTodoState();
  const [isLoading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/todo",
    }).then((response) => {
      setTodoList(response.data);
      setLoading(false);
      console.log(todoList);
    });
  }, [isLoading]);

  if (isLoading) {
    return <TodoListBlock></TodoListBlock>;
  }

  return (
    <TodoListBlock>
      {todoList.length !== 0 ? (
        todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.title}
            done={todo.isDone}
          />
        ))
      ) : (
        <div></div>
      )}
    </TodoListBlock>
  );
}

export default TodoList;
