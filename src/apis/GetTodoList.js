import axios from "axios";

function GetTodoList() {
  return axios({
    method: "get",
    url: "/api/todo",
  });
}

export default GetTodoList;
