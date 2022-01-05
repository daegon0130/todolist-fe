import axios from "axios";

function GetTodo(data) {
  return axios({
    method: "get",
    url: "/api/todo/" + data,
  });
}

export default GetTodo;
