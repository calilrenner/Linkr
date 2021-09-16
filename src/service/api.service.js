import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function setConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function registerUser(newUserData) {
  return axios.post(`${URL}sign-up`, newUserData);
}

function serverLogin(userData) {
  return axios.post(`${URL}sign-in`, userData);
}

function getTrending({ token }) {
  return axios.get(`${URL}hashtags/trending`, setConfig(token));
}

function getPosts(token) {
  return axios.get(`${URL}posts`, setConfig(token));
}

function getPostsByHashtag({ token }, hashtag) {
  return axios.get(`${URL}/hashtags/${hashtag}/posts`, setConfig(token));
}

export { getTrending, serverLogin, registerUser, getPosts, getPostsByHashtag };
