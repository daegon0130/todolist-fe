import axios from "axios";

function GetFile(data) {
  return axios({
    method: "get",
    url: "http://115.85.183.179:8080/api/files/" + data,
  });
}

export default GetFile;
