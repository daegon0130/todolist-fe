import axios from "axios";

function PutTodo(todoId, data) {
  return axios({
    method: "put",
    url: "http://115.85.183.179:8080/api/todo/" + Id,
    data,
  });
}

export default PutTodo;
