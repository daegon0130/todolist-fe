import axios from "axios";

function PostTodo(data) {
  return axios({
    method: "post",
    url: "http://115.85.183.179:8080/api/todo",
    headers: {
      "Content-type": "multipart/form-data",
    },
    data,
  });
}

export default PostTodo;
