import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function setConfig(token) {
  return;
}

function registerUser(newUserData) {
  console.log(newUserData);
  return axios.post(`${URL}sign-up`, newUserData);
}

function serverLogin(userData) {
  return axios.post(`${URL}sign-in`, userData);
}

function getTrending({ token }) {
  return axios.get(`${URL}trending`, setConfig(token));
}

export { getTrending, serverLogin, registerUser };
