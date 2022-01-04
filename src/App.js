import React from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { TodoProvider } from "./TodoContext";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <div>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/:todoId" element={<Detail />} />
        </Routes>
      </div>
    </TodoProvider>
  );
}

export default App;
