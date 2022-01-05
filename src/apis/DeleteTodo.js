import axios from "axios";

function DeleteTodo(data) {
  return axios({
    method: "delete",
    url: "http://115.85.183.179:8080/api/todo/" + data,
  });
}

export default DeleteTodo;
