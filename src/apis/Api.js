import axios from "axios";

function GetTodoList() {
  axios
    .post({
      url: "",
      dfsd: {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((response) => {
      console.log("Error");
    });
}

export default GetTodoList;
