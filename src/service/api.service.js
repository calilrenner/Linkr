import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function serverLogin(userData) {
  return axios.post(`${URL}sign-in`, userData);
}

export { serverLogin };
