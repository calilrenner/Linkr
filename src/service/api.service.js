import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function setConfig(token) {
  return { headers: { Authorization: token } };
}

function getTrending({ token }) {
  return axios.get(`${URL}trending`, setConfig(token));
}

export { getTrending };
